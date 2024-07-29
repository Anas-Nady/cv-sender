const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const companyRouter = require("./routes/companyRoute.js");
const sendCvRouter = require("./routes/sendCvRoute.js");
const invoiceRouter = require("./routes/invoiceRoute.js");

// Start express app
const app = express();

app.use(cors());

app.options("*", cors());

// Serving static files
app.use(express.static(path.resolve(__dirname, "../client", "dist")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/companies", companyRouter);
app.use("/api/send-cv", sendCvRouter);
app.use("/api/invoices", invoiceRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
