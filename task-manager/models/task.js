const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    descripttion: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        requir: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task