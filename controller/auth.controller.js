const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;


const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: "Bad request"
            });
        }

        const isUserExists = await User.findOne({ email: email });
        if (isUserExists) {
            return res.status(409).json({
                status: "User Already Exists"
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({ name, email, mobile, password: hashedPassword });
        await userData.save();

        res.json({
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Something went wrong"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Bad Request! Invalid Credentials"
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const passwordMatch = await bcrypt.compare(password, userDetails.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({ userId: userDetails._id, userName: userDetails.name }, secretKey, { expiresIn: "120h" });


        res.json({
            message: "User logged in successfully",
            userName: userDetails.name,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Something went wrong"
        });
    }
};


module.exports = { registerUser, loginUser };
