const express = require("express");
const {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  downloadAllCompany,
} = require("../controllers/companyController");
const router = express.Router();

router.route("/").get(getAllCompany).post(createCompany);
router.get("/download", downloadAllCompany);
router.route("/:id").get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
