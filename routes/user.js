const bcrypt = require("bcryptjs");
const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/User");

// @route       POST        api/users
// @desc        Registers a users
// @access      Public
router.post(
	"/",
	[
		body("name", "Name is required").not().isEmpty(),
		body("email", "Please include a valid email id").isEmail(),
		body(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}

			user = new User({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			//TO SAVE USER IN DATABASE
			await user.save();

			res.send("User saved");
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
