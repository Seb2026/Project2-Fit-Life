const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const routineSchema = new Schema (
{
    name: String,
    typeOfTraining: { 
        type: String, 
        enum: ['Speed&Power', 'Resistance', 'HIIT', 'Circuit'] },
    exercises: [ 
        {type: Schema.Types.ObjectId, ref: 'Exercise'} ],
    intensity: { 
        type: String, 
        enum: ['low', 'medium', 'high'] },
    amountOfWeight: Number,
    numberOfSets: Number,
    numberOfReps: Number,
    additionalEquipment: [String],
    timeInBetweenSets: Number,
    created: {
        type: Date,
        default: Date.now
      },
    userid: [
        {type: Schema.Types.ObjectId, ref: `User`}
    ]
},
{
    timestamps: true
}
);




module.exports = model('Routine', routineSchema)