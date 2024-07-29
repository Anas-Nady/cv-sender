const catchAsync = require("express-async-handler");
const transporter = require("./../utils/email.js");
const AppError = require("../utils/appError.js");
const companyModel = require("../models/companyModel.js");
const {
  NO_COMPANIES_AVAILABLE,
  IS_COMPLETED,
  FOOTER_TEXT,
  WELCOME_MESSAGE,
  REQUEST_JOB,
  SUBJECT_EN_EMAIL,
} = require("./../constants/SEND_CV.js");
const sendCvTemplate = require("../templates/sendCvTemplate.js");

const sendCvToCompanies = catchAsync(async (req, res, next) => {
  let {
    jobTitle,
    qualification,
    specific,
    yearsOfExperience,
    category,
    content,
    step,
  } = req.body;
  const file = req.file;

  const mailOptions = {
    from: "AnasAbdallahNady@gmail.com",
    subject: SUBJECT_EN_EMAIL,
    html: sendCvTemplate(
      REQUEST_JOB,
      WELCOME_MESSAGE,
      content,
      jobTitle,
      yearsOfExperience,
      qualification,
      specific,
      FOOTER_TEXT
    ),
    attachments: [{ filename: "MERN-Stack_Anas-Nady.pdf", path: file.path }],
  };

  try {
    let companies = await companyModel.find({ category }).select("-_id email");

    if (companies.length === 0) {
      return next(new AppError(NO_COMPANIES_AVAILABLE, 404));
    }

    const start = step * 100;
    companies = companies.slice(start, start + 100);

    const promises = companies.map(async (company, i) => {
      try {
        mailOptions.to = company.email;
        await transporter.sendMail(mailOptions);
        console.log(`${i} --> ${company.email}`);
      } catch (error) {
        console.error(`Error sending email to ${company.email}: ${error}`);
      }
    });

    // Wait for all promises to complete
    await Promise.all(promises);

    res.status(200).json({
      message: IS_COMPLETED,
    });
  } catch (error) {
    console.error("Error sending some emails:", error);
    return next(new AppError(error, 500));
  }
});

module.exports = sendCvToCompanies;
