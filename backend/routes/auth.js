const express = require("express");

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");

require("dotenv").config();

// @route       GET        api/auth
// @desc        Get logged in user data
// @access      Private
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.err(err.message);
		res.status(500).send("Server Error");
	}
});

// @route       POST        api/auth
// @desc        authenticates user(checks if user is registered or not). If registered it returns the jwt token
// @access      Public
router.post(
	"/",
	[
		body("email", "Please include a valid email").isEmail(),
		body("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 3600000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
