import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    rejectionReason: {
        type: String,
        default: ""
    }
});

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;