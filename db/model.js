const mongoose = require("mongoose")

const ExerciseSchema = new mongoose.Schema({
  username: { type: String },
  exercise: [
    {
      description: { type: String },
      duration: { type: Number },
      date: { type: String },
    },
  ],
})

module.exports = mongoose.model("Exercise", ExerciseSchema)
