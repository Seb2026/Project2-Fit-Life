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
    userid: [
      { type: Schema.Types.ObjectId, ref: 'User' }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model(`Exercise`, exerciseSchema);