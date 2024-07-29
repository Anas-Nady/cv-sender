const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError.js");
const companyModel = require("../models/companyModel.js");
const fs = require("fs");
const {
  COMPANY_NOT_EXISTS,
  COMPANY_IS_EXISTS,
} = require("./../constants/COMPANY.js");

const getAllCompany = catchAsync(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 50;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        email: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const categoryFilter = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const count = await companyModel.count({ ...keyword, ...categoryFilter });
  const companies = await companyModel
    .find({ ...keyword, ...categoryFilter })
    .sort("-createdAt")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({
    companies,
    totalCompanies: count,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

const downloadAllCompany = catchAsync(async (req, res, next) => {
  const data = await companyModel.find({}).select("_id name email category");

  res.status(200).json({
    data,
  });
});

const getCompany = catchAsync(async (req, res, next) => {
  const company = await companyModel.findById(req.params.id);

  if (!company) {
    return next(new AppError(COMPANY_NOT_EXISTS, 404));
  }

  res.status(200).json({
    status: "success",
    data: company,
  });
});

const createCompany = catchAsync(async (req, res, next) => {
  const { name, email, category } = req.body;

  const isExists = await companyModel.findOne({ email });

  if (isExists) {
    return next(new AppError(COMPANY_IS_EXISTS, 400));
  }

  const newCompany = await companyModel.create({ name, email, category });

  if (newCompany) {
    res.status(201).json({
      status: "success",
      data: newCompany,
    });
  } else {
    return next(new AppError("invalid data", 500));
  }
});

const updateCompany = catchAsync(async (req, res, next) => {
  const { name, email, category } = req.body;

  const updatedCompany = await companyModel.findByIdAndUpdate(
    req.params.id,
    { name, email, category },
    { new: true, runValidators: true }
  );

  if (!updatedCompany) {
    return next(new AppError(COMPANY_NOT_EXISTS, 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedCompany,
  });
});

const deleteCompany = catchAsync(async (req, res, next) => {
  const company = await companyModel.findByIdAndDelete(req.params.id);

  if (!company) {
    return next(new AppError(COMPANY_NOT_EXISTS, 404));
  }

  res.status(200).json({ status: "success" });
});

module.exports = {
  getAllCompany,
  downloadAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
