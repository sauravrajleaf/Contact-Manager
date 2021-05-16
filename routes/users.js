const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const Users = require("../models/Users");

// @route       POST        api/users
// @desc        Registers a user
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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		res.send("passed");
	}
);

module.exports = router;
