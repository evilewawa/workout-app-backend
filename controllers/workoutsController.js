const Workout = require("../models/workout")

const asyncHandler = require("express-async-handler")
// for password handling, not used right now
const bcrypt = require("bcrypt")

//@desc get all workouts
// @route GET /workouts
// @access Private
const getAllWorkouts = asyncHandler(async (req, res) => {
    // if i had a password, it would be .find().select("-password") to not recieve password
    const workouts = await Workout.find().lean()
    if (!workouts) {
        return res.status(400).json({message:"No user found"})
    }
    res.json(workouts)
})

//@desc create new workout
// @route POST /workouts
// @access Private
const createNewWorkout = asyncHandler(async (req, res) => {
    const {exercise_name, weight, sets, userID} = req.body

    if (!exercise_name || !weight || !sets || (!userID) || !Array.isArray(sets) || !sets.length){
        console.log(exercise_name, weight, sets, userID)
        return res.status(400).json({message:"All feilds are required"})
    }
    // duplicate checker would go here via Workout.findOne({feild}).lean().exec() but not neccessary for me right now
    // bcrypt would be used for password 
    const workoutObject = {exercise_name, weight, sets, userID}
    //create and store workout
    const workout = await Workout.create(workoutObject)
    if (workout){
        res.status(201).json({message:`New workout ${workout._id} created`})
    }else{
        res.status(400).json({message:"invalid workout data"})
    }
})

//@desc update workout
// @route PATCH /workouts
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
    const {id, exercise_name, weight, sets, userID} = req.body
    if (!id || !exercise_name || !weight || !sets || !userID || !Array.isArray(sets) || !sets.length){
        return res.status(400).json({message:"All feilds are required"})
    }
    const workout = await Workout.findById(id).exec()
    if (!workout){
        return res.status(400).json({message:"workout not found"})
    }
    // duplicate checking would also be valid here for some other form of data 
    workout.exercise_name = exercise_name
    workout.weight = weight
    workout.sets = sets
    workout.userID = userID

    const updatedWorkout = await workout.save()

    res.json({message:`${updatedWorkout.id} updated`})
})

//@desc delete workout
// @route DELETE /workouts
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
    const {id} = req.body
    if (!id){
        return res.status(400).json({message:"id is required"})
    }
    const workout = await Workout.findById(id).exec()
    if (!workout){
        return res.status(400).json({message:"user not found"})
    }
    const result = await workout.deleteOne()
    const reply = `Username ${result.id} deleted`
    res.json(reply)
})

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    updateWorkout,
    deleteWorkout
}