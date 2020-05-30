const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
  },

  // exercises: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Exercise",
  //   },
  // ],
  exercises: [],
});

WorkoutSchema.methods.setTotalDuration = function () {
  this.totalDuration = 0;

  this.exercises.forEach(exercise => {
    totalDuration += exercise.totalDuration;
  });
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
