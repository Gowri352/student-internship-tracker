import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Student from "./models/student.js";
import Internship from "./models/internship.js";
import Faculty from "./models/faculty.js";

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.send("Student Internship Tracker Backend Running");
});


// ==========================================
// STUDENT CREATE ACCOUNT
// ==========================================

app.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // Check whether email already belongs to Student
        const existingStudent = await Student.findOne({
            email: email
        });

        if (existingStudent) {

            return res.status(400).json({
                message: "Email already registered as Student"
            });

        }


        // Check whether email already belongs to Faculty
        const existingFaculty = await Faculty.findOne({
            email: email
        });

        if (existingFaculty) {

            return res.status(400).json({
                message: "This email is registered as Faculty. Please use a Student email."
            });

        }


        // Create Student
        const student = new Student({
            name: name,
            email: email,
            password: password
        });

        await student.save();


        res.status(201).json({
            message: "Student account created successfully"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// STUDENT LOGIN
// ==========================================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        // IMPORTANT:
        // Check if this email belongs to Faculty

        const faculty = await Faculty.findOne({
            email: email
        });

        if (faculty) {

            return res.status(400).json({
                message: "This email belongs to a Faculty account. Please use Faculty Login."
            });

        }


        // Find Student
        const student = await Student.findOne({
            email: email
        });

        if (!student) {

            return res.status(400).json({
                message: "Student email not found"
            });

        }


        // Check password
        if (student.password !== password) {

            return res.status(400).json({
                message: "Incorrect password"
            });

        }


        // Successful Student Login
        res.status(200).json({

            message: "Login successful",

            student: {
                name: student.name,
                email: student.email
            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// ADD INTERNSHIP
// ==========================================

app.post("/internships", async (req, res) => {

    try {

        const {
            studentEmail,
            companyName,
            role,
            startDate,
            endDate
        } = req.body;


        const internship = new Internship({

            studentEmail: studentEmail,

            companyName: companyName,

            role: role,

            startDate: startDate,

            endDate: endDate,

            status: "Pending",

            rejectionReason: ""

        });


        await internship.save();


        res.status(201).json({

            message: "Internship submitted successfully",

            internship: internship

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// VIEW STUDENT INTERNSHIPS
// ==========================================

app.get("/internships/student/:email", async (req, res) => {

    try {

        const email = req.params.email;


        const internships = await Internship.find({

            studentEmail: email

        });


        res.status(200).json(internships);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// DELETE INTERNSHIP
// ==========================================

app.delete("/internships/:id", async (req, res) => {

    try {

        const internship =
            await Internship.findByIdAndDelete(
                req.params.id
            );


        if (!internship) {

            return res.status(404).json({
                message: "Internship not found"
            });

        }


        res.status(200).json({

            message: "Internship deleted successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// FACULTY CREATE ACCOUNT
// ==========================================

app.post("/faculty/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // Check Faculty email
        const existingFaculty = await Faculty.findOne({
            email: email
        });

        if (existingFaculty) {

            return res.status(400).json({
                message: "Faculty email already registered"
            });

        }


        // IMPORTANT:
        // Check whether email belongs to Student

        const existingStudent = await Student.findOne({
            email: email
        });

        if (existingStudent) {

            return res.status(400).json({

                message:
                    "This email is already registered as Student. Please use a different email."

            });

        }


        // Create Faculty
        const faculty = new Faculty({

            name: name,

            email: email,

            password: password

        });


        await faculty.save();


        res.status(201).json({

            message: "Faculty account created successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// FACULTY LOGIN
// ==========================================

app.post("/faculty/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        // IMPORTANT:
        // Check whether email belongs to Student

        const student = await Student.findOne({
            email: email
        });

        if (student) {

            return res.status(400).json({

                message:
                    "This page belongs to faculty login."

            });

        }


        // Find Faculty
        const faculty = await Faculty.findOne({
            email: email
        });


        if (!faculty) {

            return res.status(400).json({

                message: "Faculty email not found"

            });

        }


        // Check password
        if (faculty.password !== password) {

            return res.status(400).json({

                message: "Incorrect password"

            });

        }


        // Successful Faculty Login
        res.status(200).json({

            message: "Faculty login successful",

            faculty: {

                name: faculty.name,

                email: faculty.email

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// FACULTY VIEW ALL INTERNSHIPS
// ==========================================

app.get("/faculty/internships", async (req, res) => {

    try {

        const internships =
            await Internship.find();


        res.status(200).json(internships);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// FACULTY APPROVE INTERNSHIP
// ==========================================

app.put(
    "/faculty/internships/:id/approve",
    async (req, res) => {

        try {

            const internship =
                await Internship.findByIdAndUpdate(

                    req.params.id,

                    {
                        status: "Approved",

                        rejectionReason: ""
                    },

                    {
                        new: true
                    }

                );


            if (!internship) {

                return res.status(404).json({

                    message: "Internship not found"

                });

            }


            res.status(200).json({

                message:
                    "Internship approved successfully",

                internship: internship

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message: "Server error"

            });

        }

    }
);


// ==========================================
// FACULTY REJECT INTERNSHIP
// ==========================================

app.put(
    "/faculty/internships/:id/reject",
    async (req, res) => {

        try {

            const { rejectionReason } = req.body;


            const internship =
                await Internship.findByIdAndUpdate(

                    req.params.id,

                    {
                        status: "Rejected",

                        rejectionReason:
                            rejectionReason
                    },

                    {
                        new: true
                    }

                );


            if (!internship) {

                return res.status(404).json({

                    message: "Internship not found"

                });

            }


            res.status(200).json({

                message:
                    "Internship rejected successfully",

                internship: internship

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message: "Server error"

            });

        }

    }
);

// ==========================================
// START SERVER
// ==========================================

app.listen(5000, () => {

    console.log(
        "Server running on http://localhost:5000"
    );

});