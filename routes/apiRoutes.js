const db = require("../models")

module.exports = (app) => {
// POST
app.post("/api/workouts", (req, res) => {
    // Create current date/time
    db.Workout.create({day: Date.now()})
    .then(Workout => {
        res.json(Workout);
    })
    .catch(err => {
        res.json(err)
    })
})

// PUT
app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    db.Exercise.create(req.body)
    .then((data) => db.Workout.findOneAndUpdate(
        {_id: req.params.id},
        {
            $push: {
                exercises: data._id
            },
            $inc: {
                totalDuration: data.duration
            }
        },
        { new: true })
    )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err)
    })
})

// GET
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .populate("exercises")
        .then(dbWorkout=> {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err);
        })
    })

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
    })
    
}