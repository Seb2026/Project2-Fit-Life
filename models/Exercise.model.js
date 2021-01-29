const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const exerciseSchema = new Schema(
  {
    exerciseName: {
      type: String,
      required: [true],
    },
    targetedBodyPart: {
      type: String,
    },
    howToDoIt: {
      type: String,
    },
    exerciseImg: {
        type: String,
    }
  },
  {
    timestamps: true
  }
);

module.exports = model(`Exercise`, exerciseSchema);