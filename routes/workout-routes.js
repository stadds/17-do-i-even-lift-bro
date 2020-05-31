const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  console.log("get api/workouts");

  db.Workout.find({})
    .sort({ _id: -1 })
    .limit(-1)
    .then((dbWorkout) => {
      console.log(dbWorkout);
      let result = dbWorkout[0];
      const resultArr = result.exercises;

      console.log("print result");
      console.log(result);
      console.log(resultArr);

      let sumDuration = 0;

      resultArr.forEach((exercise) => {
        sumDuration += exercise.duration;
      });
      console.log(sumDuration);

      result.totalDuration = sumDuration;
      console.log(result);

      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("in workout/:id  : " + req.params.id + ",  " + req.body);

  db.Workout.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: { exercises: req.body },
    }
  )
    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  console.log("post workouts " + body);

  db.Workout.create(body)
    .then((dbWorkout) => {
      console.log("success: " + dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  console.log("in /api/workouts/range" + req.body);
  db.Workout.find({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
