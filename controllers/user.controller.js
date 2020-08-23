const bcrypt = require('bcrypt');
const { check, validationResult} = require("express-validator/check");
const User = require('../models/user.model');

exports.register = function (req, res) {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({  
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} else {
	
		try {
		
			User.findOne({email: req.body.email}, function(err, user) {
			if (user) {
					return res.status(404).json({
						status: 'Error',
						code: '404',
						message: 'User email id already exists.'
					});
			} else {
					const salt = bcrypt.genSaltSync(10); 
					const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
					let user = new User(
						{
							name: req.body.name,
							email: req.body.email,
							password: encryptedPassword,
							phone:req.body.phone,
							address: req.body.address,
							user_role_id: req.body.role,
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
			}); 
		}
		catch (err) {
		res.status(500).json({ 
				status: 'Error',
				code: '500',
				message: 'Error on the server.'
			});
		}
	}
};



exports.GetAllUser = function (req, res) {
	try {
		User.find({}, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching user details.'
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				data:data  
			});    
		}); 
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the server.',
		});
    }
};

exports.GetUserById = function (req, res) {
	try {
		User.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching user details.'
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				data:data  
			});    
		}); 
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the server.',
		});
    }
};

exports.EditUser = function (req, res) {
	try {
		
		User.findByIdAndUpdate({_id : req.body._id}, {
			name: req.body.first_name,
			phone: req.body.phone,
			address: req.body.address,
			user_role_id: req.body.role,
			permissions:req.body.permissions,
			updated_at: new Date()
			
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update user details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'user details updated successfully.',
			});  
		});
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the server.',
		});
    }
};

exports.DeleteUser = function (req, res) {
	try {
		User.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete user.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'user deleted successfully.'  
			});  
		});
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the server.',
		});
    }
};