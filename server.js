const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route");
const jobRoute = require("./routes/job.route");

const app = express();
app.use(express.json())
dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("/api/", (req, res) => {
    res.json({
        status: "Success",
        service: "Job Listing Portal",
        time: new Date()
    })
})


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", jobRoute);

app.listen(PORT, () => {
    try {
        console.log(`Server is up on PORT: ${PORT}`)
    } catch (error) {
        console.log(`Server is not running ERROR:${error}`);
    }
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => console.log("DB Failed to connect, ERROR:", error));
