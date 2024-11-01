const express = require("express");

class HelloWorldRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", (req, res) => {
      return res.json({ message: "Hello World!" });
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = HelloWorldRoutes;
