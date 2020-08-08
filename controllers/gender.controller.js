const bcrypt = require('bcrypt');
const { check, validationResult} = require("express-validator/check");
const Gender = require('../models/gender.model');

exports.AddGender = function (req, res) {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	}  
	
	try {

		let gender = new Gender(
			{
				name: req.body.name,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		gender.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in created gender.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Gender created successfully' 
			});  
		});
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Server Error.',
		});
    }
};