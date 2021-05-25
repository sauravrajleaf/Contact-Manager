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
router.post("/",[ auth, [
	body('name','Name is required').not().isEmpty()
] ], async (req, res) => {

	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
	const { name , email , phone, type } = req.body ; 

	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id

		});

		const contact = await newContact.save();

		res.json(contact);


	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
	
});

// @route       PUT        api/contacts/:id
// @desc        Update given id contact
// @access      Private
router.put("/:id", auth, async (req, res) => {

	const { name , email , phone, type } = req.body ; 

	//BUILD CONTACT OBJECT
	const contactFields = {};
	if(name) contactFields.name = name;
	if(email) contactFields.email = email;
	if(phone) contactFields.phone = phone;
	if(type) contactFields.type = type;

	try {
		
		let contact = await Contact.findById(req.params.id);

		if(!contact) return res.status(404).json({msg: "Contact Not Found"});

		//MAKE SURE USER OWNS CONTACT
		if(contact.user.toString() !== req.user.id){
			return res.status(401).json({msg:"Not Authorized"});
		}

		contact = await Contact.findByIdAndUpdate(req.params.id, 
			{ $set: contactFields},
			{ new: true});

			res.json(contact)

	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
		
	}

});

// @route       DELETE        api/contacts/:id
// @desc        Deletes given id contact
// @access      Public
router.delete("/:id", auth, async (req, res) => {
	
	try {
		
		let contact = await Contact.findById(req.params.id);

		if(!contact) return res.status(404).json({msg: "Contact Not Found"});

		//MAKE SURE USER OWNS CONTACT
		if(contact.user.toString() !== req.user.id){
			return res.status(401).json({msg:"Not Authorized"});
		}

		await Contact.findByIdAndRemove(req.params.id);


		res.json({msg: "Contact Removed"});

	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
		
	}
});

module.exports = router;
