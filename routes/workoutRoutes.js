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

router.route("/getWorkoutNames").get(workoutsController.getAllWorkoutNames)
router.route("/:userID/:exercise_name").get(workoutsController.getSpecificWorkoutsByUserID)

router.route("/:userID").get(workoutsController.getAllWorkoutsByUserID)


module.exports = router