const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");
const verifyToken = require("../middleware/verifyToken")

router.post('/create', verifyToken, jobController.createJobPost);
router.get('/job-details/:jobId', jobController.getJobDetailsById);
router.put('/update/:jobId', verifyToken, jobController.updateJobDetailsById);
router.delete('/job-details/:jobId', verifyToken, jobController.deleteJobById);
router.get('/all-jobs', jobController.getAllJobs);


module.exports = router;
