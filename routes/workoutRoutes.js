const express = require("express")
const router = express.Router()
const workoutsController = require("../controllers/workoutsController")


router.route("/")
    //read
    .get(workoutsController.getAllWorkouts)
    //create
    .post(workoutsController.createNewWorkout)
    //update
    .patch(workoutsController.updateWorkout)
    //delete
    .delete(workoutsController.deleteWorkout)

module.exports = router