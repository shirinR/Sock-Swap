
// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  })
  .get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  })
  .get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  })
  .get("/item", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/item.html"));
  })
};
