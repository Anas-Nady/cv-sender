const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    category: {
      type: String,
      required: true,
      enum: ["education", "saudi", "khalij", "test"],
    },
  },
  { timestamps: true }
);

companySchema.index({ email: 1 });

const CompanyModel = mongoose.model("Company", companySchema);

module.exports = CompanyModel;
