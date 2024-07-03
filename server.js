// server.js
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Bind the router db to the app
server.db = router.db;

// Apply the auth middleware before the router
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(port, () => {
  console.log("JSON Server is running on port", port);
});
