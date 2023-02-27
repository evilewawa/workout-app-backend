const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const workoutSchema = new mongoose.Schema({
    // _id: id of individual entry, automatically set
    // exercise_name: name of exercise
    // weight: Int (not necessarily postive becuase for example if using exercise band on pullup then its negative)
    // date: mongo date object <- year, month, date, hour, minute minimum, done by timestamps
    // sets: Arr[Int]
    // userID: Int (0 for me)
    exercise_name:{
        type:String,
        required:true
    },
    weight: {
        type: Number,
        required:true
    },
    sets : [{
        type:Number,
        default:0
    }],
    userID: {
        type:Number,
        required:true
    }
}, {timestamps:true})

// workoutSchema.plugin(AutoIncrement, {
//     inc_feild:"ticket",
//     id:"ticketNums",
//     start_seq:100
// })

module.exports = mongoose.model("Workout", workoutSchema)