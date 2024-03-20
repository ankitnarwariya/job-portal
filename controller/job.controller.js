const Job = require("../models/job.model");

const createJobPost = async (req, res) => {
    try {
        const { companyName, title, description, logoUrl, salary, location, duration, locationType, skills, refUserId } = req.body;

        if (!companyName || !title || !description || !logoUrl || !salary || !location || !duration || !locationType || !skills || !refUserId) {
            return res.status(400).json({
                message: "Bad request"
            });
        }

        const userId = req.userId

        console.log(userId);

        const jobDetails = new Job({ companyName, title, description, logoUrl, salary, location, duration, locationType, skills, refUserId: userId });

        await jobDetails.save();

        res.json({
            status: "SUCCESS",
            message: "Job has been created!"
        });
    } catch (error) {
        console.error("Something went wrong ERROR: ", error);
        res.status(500).json({
            status: "Something went wrong"
        });
    }
};

const getJobDetailsById = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobDetails = await Job.findById(jobId);

        if (!jobDetails) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json({
            status: "SUCCESS",
            data: jobDetails
        });
    } catch (error) {
        console.error("Something went wrong ERROR: ", error);
        res.status(500).json({
            status: "Something went wrong"
        });
    }
};



module.exports = { createJobPost, getJobDetailsById };