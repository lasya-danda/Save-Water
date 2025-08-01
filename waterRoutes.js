const express = require("express");
const router = express.Router();
const waterController = require("../controllers/waterController");

router.post("/add", waterController.addUsage);
router.get("/all", waterController.getUsage);

module.exports = router;
