const bcrypt = require('bcrypt');
const { check, validationResult} = require("express-validator/check");
const User = require('../models/user.model');

exports.register = function (req, res) {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	} 
	
	
	try {
	
		User.findOne({email: req.body.email}, function(err, user) {
		   if (user) {
				return res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'User email id already exists.'
				});
		   } 
		}); 

		const salt = bcrypt.genSaltSync(10); 
		const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
		let user = new User(
			{
				user_role_id: req.body.role,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: encryptedPassword,
				phone: req.body.phone,
				country_id: req.body.country_id,
				state_id: req.body.state_id,
				city_id: req.body.city_id,
				address: req.body.address,
				permissions:req.body.permissions,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		user.save(function (err) {
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'User Not Created'
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'User created successfully' 
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