const express = require("express");

const router = express.Router();

// @route       GET        api/contacts
// @desc        Get all users contacts
// @access      Private
router.get("/", (req, res) => {
	res.send("Get all Contacts");
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
