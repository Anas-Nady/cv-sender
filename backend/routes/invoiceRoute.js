const express = require("express");
const {
  getAllInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");
const router = express.Router();

router.route("/").get(getAllInvoices).post(createInvoice);
router.route("/:id").get(getInvoice).delete(deleteInvoice);

module.exports = router;
