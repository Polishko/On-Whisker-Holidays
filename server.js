import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import bcrypt from "bcrypt"; // Import bcrypt
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Custom login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  const users = router.db.get("users").value(); // Get users from the db.json file
  const user = users.find(
    (u) => u.username === username || u.email === username
  );

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.json({ success: true, token: "123456", user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
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

app.use(middlewares);
app.use(rules);
app.use(auth);
app.use("/api", router);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
