const jobModel = require("../models/job.model");

const createJobPost = (req, res) => {
    try {
        const {
            companyName,
            title,
            description,
            logoUrl,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId
        } = req.body;

    } catch (error) {
        console.log("Something went wrong ERROR: ", error);
        res.status(500).json({
            status: "Something went wrong"
        });
    }
}