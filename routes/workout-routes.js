const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ _id: -1 })
    .limit(-1)
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {});

router.put("/api/workouts/:id", (req, res) => {});

router.get("/api/workouts/range", (req, res) => {});

module.exports = router;
