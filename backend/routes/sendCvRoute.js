const express = require("express");
const sendCvToCompanies = require("../controllers/sendCvController.js");
const upload = require("./../middleware/multerMiddleware.js");
const router = express.Router();

router.post("/", upload.single("pdf"), sendCvToCompanies);

module.exports = router;
