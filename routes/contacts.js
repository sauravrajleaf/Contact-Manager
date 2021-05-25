const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");


const User = require("../models/User");
const Contact = require("../models/Contact");

// @route       GET        api/contacts
// @desc        Get all users contacts
// @access      Private
router.get("/", auth, async (req, res) => {
	try {
		const contacts = await Contact.find({user: req.user.id }).sort({ data: -1});
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       POST        api/contacts
// @desc        Add new contact
// @access      Private
router.post("/", (req, res) => {
	res.send("Add contact");
});

// @route       PUT        api/contacts/:id
// @desc        Update given id contact
// @access      Private
router.put("/:id", (req, res) => {
	res.send("Update given id contact");
});

// @route       DELETE        api/contacts/:id
// @desc        Deletes given id contact
// @access      Public
router.delete("/:id", (req, res) => {
	res.send("Deleted given id contact");
});

module.exports = router;
