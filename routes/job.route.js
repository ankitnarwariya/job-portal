const express = require("express");
const router = express.Router();
const jobController = ("../controller/job.controller")

router.post('/job/create', jobController.createJobPost)