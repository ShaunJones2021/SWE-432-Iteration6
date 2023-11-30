const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/calendar", { page_name: "calendar" });
});

module.exports = router;