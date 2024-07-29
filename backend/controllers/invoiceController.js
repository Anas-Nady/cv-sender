const InvoiceModel = require("../models/invoiceModel");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError.js");
const transporter = require("./../utils/email.js");
const companyModel = require("../models/companyModel.js");
const {
  SUBJECT_EMAIL,
  EDUCATION_PACKAGE,
  SAUDI_PACKAGE,
  KHALIJ_PACKAGE,
  TEST_PACKAGE,
  IS_INVOICE_NUMBER_EXISTS,
  INVOICE_NOT_FOUND,
} = require("../constants/INVOICE_CLIENT");
const day = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const invoiceTemplate = require("../templates/invoiceTemplate.js");
day.extend(advancedFormat);

const getAllInvoices = catchAsync(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.customerEmail
    ? {
        customerEmail: {
          $regex: req.query.customerEmail,
          $options: "i",
        },
      }
    : {};

  const count = await InvoiceModel.countDocuments({ ...keyword });
  const invoices = await InvoiceModel.find({ ...keyword })
    .sort("-createdAt")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({
    invoices,
    totalInvoices: count,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

const getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await InvoiceModel.findById(req.params.id);

  if (!invoice) {
    return next(new AppError(INVOICE_NOT_FOUND, 404));
  }

  const companies = await companyModel.countDocuments({
    category: invoice.packageType,
  });

  res.status(200).json({
    status: "success",
    invoice,
    totalCompanies: companies,
  });
});

const createInvoice = catchAsync(async (req, res, next) => {
  const { invoiceNumber, customerName, customerEmail, packageType } = req.body;

  try {
    const isInvoiceNumberExists = await InvoiceModel.findOne({ invoiceNumber });

    if (isInvoiceNumberExists) {
      return next(new AppError(IS_INVOICE_NUMBER_EXISTS));
    }

    const invoice = await InvoiceModel.create({
      invoiceNumber,
      customerName,
      customerEmail,
      packageType,
    });

    if (!invoice) {
      return next(new AppError("invalid data", 500));
    }

    const companies = await companyModel.find({ category: packageType });
    const typeOfPackage =
      packageType === "education"
        ? EDUCATION_PACKAGE
        : packageType === "saudi"
        ? SAUDI_PACKAGE
        : packageType == "khalij"
        ? KHALIJ_PACKAGE
        : packageType == "test"
        ? TEST_PACKAGE
        : "";

    const date = day(invoice.createdAt).format("hh:mmA, DD/MM/YYYY");
    //
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      subject: `${SUBJECT_EMAIL}: ${typeOfPackage}`,
      to: customerEmail,
      html: invoiceTemplate({
        typeOfPackage,
        invoiceNumber,
        customerName,
        customerEmail,
        totalCompanies: companies.length,
        date,
      }),
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      await InvoiceModel.findByIdAndDelete(invoice._id);
      return next(new AppError(error, 400));
    }

    res.status(201).json({
      status: "success",
      invoice,
    });
  } catch (error) {
    if (invoice) {
      await InvoiceModel.findByIdAndDelete(invoice._id);
    }
    return next(new AppError(error, 500));
  }
});

const deleteInvoice = catchAsync(async (req, res, next) => {
  const invoice = await InvoiceModel.findByIdAndDelete(req.params.id);

  if (!invoice) {
    return next(new AppError(INVOICE_NOT_FOUND, 404));
  }

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
};
