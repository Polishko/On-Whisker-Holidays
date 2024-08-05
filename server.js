import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bcrypt from "bcrypt"; // Import bcrypt for password comparison
import jwt from "jsonwebtoken"; // Import jwt for token generation

// ES module replacement for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const SECRET_KEY = "your-secret-key"; // Replace with a strong secret key
const TOKEN_EXPIRATION = "1h"; // Set token expiration time

// Enable CORS
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Custom login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Get users from the db.json file
  const users = router.db.get("users").value();
  const user = users.find((u) => u.email === email);

  if (user) {
    // Compare the hashed password with the incoming password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: TOKEN_EXPIRATION,
      });
      res.json({ success: true, token, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// PUT user route to update user data
app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { email, name, avatar, password } = req.body;

  // Find the user by ID
  const users = router.db.get("users").value();
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user data, check if password is provided and needs to be updated
  const updatedUser = {
    ...user,
    email: email || user.email,
    name: name || user.name,
    avatar: avatar || user.avatar,
    password: password ? await bcrypt.hash(password, 10) : user.password, // Encrypt only if password is provided
  };

  // Update the user in the database
  router.db
    .get("users")
    .find({ id: parseInt(userId) })
    .assign(updatedUser)
    .write();

  res.json({ success: true, user: updatedUser });
});

server.db = router.db;

// Middleware to check for authorization token on PUT, PATCH, DELETE requests
app.use((req, res, next) => {
  if (
    (req.method === "PUT" ||
      req.method === "PATCH" ||
      req.method === "DELETE") &&
    !req.headers.authorization
  ) {
    res.status(401).json({ error: "Authorization token is required" });
  } else {
    next();
  }
});

// Custom routes and permission settings
const rules = auth.rewriter({
  users: 644,
  ratings: 644,
  comments: 644,
  hotels: 644,
});

// Apply the auth middleware and custom routes
app.use(middlewares);
app.use(rules); // Apply the custom rewriter rules
app.use(auth); // Apply the auth middleware
app.use("/api", router); // Serve JSON Server API under /api

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "dist")));

// For any other routes, serve index.html from the build directory
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
