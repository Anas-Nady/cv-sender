const InvoiceModel = require("../models/invoiceModel");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError.js");
const transporter = require("./../utils/email.js");
const companyModel = require("../models/companyModel.js");
const {
  INVOICE_NUMBER,
  CUSTOMER_NAME,
  CUSTOMER_EMAIL,
  PACKAGE_TYPE,
  DATE_OF_INVOICE,
  NUMBER_OF_COMPANIES,
  DEFAULT_MESSAGE,
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
      html: `
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Appointment Reminder Email Template</title>
          <meta name="description" content="Appointment Reminder Email Template" />
        </head>
        <style>
          a:hover {
            text-decoration: underline !important;
          }
        </style>
      
        <body
          marginheight="0"
          topmargin="0"
          marginwidth="0"
          style="margin: 0px; background-color: #f2f3f8"
          leftmargin="0"
          dir="rtl"
        >
          <table
            cellspacing="0"
            border="0"
            cellpadding="0"
            width="100%"
            bgcolor="#f2f3f8"
            style="
              @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
              font-family: 'Open Sans', sans-serif;
            "
          >
            <tr>
              <td>
                <table
                  style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td style="height: 80px">&nbsp;</td>
                  </tr>
                  <!-- Logo -->
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <!-- Email Content -->
                  <tr>
                    <td>
                      <table
                        width="95%"
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          max-width: 670px;
                          background: #fff;
                          border-radius: 3px;
                          -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          padding: 0 40px;
                        "
                      >
                        <tr>
                          <td style="height: 40px">&nbsp;</td>
                        </tr>
                        <!-- Title -->
                        <tr>
                          <td style="padding: 0 15px; text-align: center">
                            <h3
                              style="
                                color: #1e1e2d;
                                font-weight: 400;
                                margin: 0;
                          font-size: 20px !important;
                                font-family: 'Rubik', sans-serif;
                              "
                            >
                              ${SUBJECT_EMAIL}: <h3>${typeOfPackage}</h3>
                            </>
                            <span
                              style="
                                display: inline-block;
                                vertical-align: middle;
                                margin: 29px 0 26px;
                        h        border-bottom: 1px solid #cecece;
                                width: 100px;
                              "
                            ></span>
                          </td>
                        </tr>
                        <!-- Details Table -->
                        <tr>
                          <td>
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="width: 100%; border: 1px solid #ededed"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      border-right: 1px solid #ededed;
                                      width: 35%;
                                      font-weight: 500;
                                      color: rgba(0, 0, 0, 0.64);
                                    "
                                  >
                                    ${INVOICE_NUMBER}:
                                  </td>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      color: #455056;
                                    "
                                  >
                                    ${invoiceNumber
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      border-right: 1px solid #ededed;
                                      width: 35%;
                                      font-weight: 500;
                                      color: rgba(0, 0, 0, 0.64);
                                    "
                                  >
                                    ${CUSTOMER_NAME}:
                                  </td>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      color: #455056;
                                    "
                                  >
                                    ${customerName}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      border-right: 1px solid #ededed;
                                      width: 35%;
                                      font-weight: 500;
                                      color: rgba(0, 0, 0, 0.64);
                                    "
                                  >
                                    ${CUSTOMER_EMAIL}:
                                  </td>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      color: #455056;
                                    "
                                  >
                                    ${customerEmail}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      border-right: 1px solid #ededed;
                                      width: 35%;
                                      font-weight: 500;
                                      color: rgba(0, 0, 0, 0.64);
                                    "
                                  >
                                    ${PACKAGE_TYPE}:
                                  </td>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      color: #455056;
                                    "
                                  >
                                    ${typeOfPackage}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      border-right: 1px solid #ededed;
                                      width: 35%;
                                      font-weight: 500;
                                      color: rgba(0, 0, 0, 0.64);
                                    "
                                  >
                                    ${NUMBER_OF_COMPANIES}:
                                  </td>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      color: #455056;
                                    "
                                  >
                                    ${companies.length}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      border-right: 1px solid #ededed;
                                      width: 35%;
                                      font-weight: 500;
                                      color: rgba(0, 0, 0, 0.64);
                                    "
                                  >
                                    ${DATE_OF_INVOICE}:
                                  </td>
                                  <td
                                    style="
                                      padding: 10px;
                                      border-bottom: 1px solid #ededed;
                                      color: #455056;
                                    "
                                  >
                                    ${date}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style="
                                font-size: 15px;
                                color: #455056;
                                margin: 20px 0 0;
                                line-height: 24px;
                                text-align: center;
                                font-weight: 600;
                              "
                            >
                              تمنياتنا لك بالتوفيق.
                              <br />
                              ملاحظة: في حال كانت مؤهلاتك مناسبة لمسؤولي التوظيف، سيتم
                              التواصل معك سواء عبر الإيميل أو على جوالك.
                              <br />
                              هذه الرسالة
                              آلية من منصة آفاق ولا يجب الرد عليها..
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="height: 40px">&nbsp;</td>
                        </tr>
                        <tr>
                        <td style="text-align: center">
                          <p
                            style="
                              font-size: 14px;
                              color: #455056bd;
                              line-height: 18px;
                              margin: 0 0 0;
                              padding-bottom: 25px;
                            "
                          >
                            &copy; <strong>www.afaqjobs.com</strong>
                          </p>
                        </td>
                      </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
              
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
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
