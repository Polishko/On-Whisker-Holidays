import jsonServer from "json-server";
import auth from "json-server-auth";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express"; // Ensure express is installed

// ES module replacement for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the Express server
const server = express();
const jsonServerRouter = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Enable CORS
server.use(cors());

// Bind the JSON Server's router db to the app
server.db = jsonServerRouter.db;

// Middleware to check for authorization token on PUT, PATCH, DELETE requests
server.use((req, res, next) => {
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
  users: 644, // Everyone can read, but only the owner can write
  ratings: 644, // Everyone can read, but only the owner can write
  comments: 644, // Everyone can read, but only the owner can write
  hotels: 644, // Everyone can read, but only the owner can write
});

// Apply the auth middleware and custom routes
server.use(middlewares);
server.use(rules); // Apply the custom rewriter rules
server.use(auth); // Apply the auth middleware

// Serve the JSON Server API under the /api route
server.use("/api", jsonServerRouter);

// Serve static files from the build directory for the React app
server.use(express.static(path.join(__dirname, "dist")));

// For any other routes, serve index.html from the build directory
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
server.listen(port, () => {
  console.log("Server is running on port", port);
});
