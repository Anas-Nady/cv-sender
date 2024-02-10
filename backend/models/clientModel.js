const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the client"],
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
    indexOfMarketing: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("Client", clientSchema);

module.exports = ClientModel;
