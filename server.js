const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Enable CORS
server.use(cors());

// Bind the router db to the app
server.db = router.db;

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
  ratings: 644, // Everyone can read, but only the owner can write
  users: 644, // Everyone can read, but only the owner can write
  comments: 644, // Everyone can read, but only the owner can write
  hotels: 644, // Everyone can read, but only the owner can write
});

// Apply the auth middleware and custom routes
server.use(middlewares);
server.use(rules); // Apply the custom rewriter rules
server.use(auth); // Apply the auth middleware
server.use(router);

server.listen(port, () => {
  console.log("JSON Server is running on port", port);
});
