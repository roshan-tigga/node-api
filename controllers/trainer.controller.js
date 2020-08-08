const { check, validationResult} = require("express-validator/check");
const Trainer = require('../models/trainer.model');
exports.AddTrainer = function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
	
		let trainer = new Trainer(
			{
				user_id:req.userId,
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				gender_id: req.body.gender_id,
				dob: req.body.dob,
				address: req.body.address,
				experience: req.body.experience,
				photo: req.body.photo,
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		trainer.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in created trainer.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Trainer created successfully'  
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



exports.GetTrainer = function (req, res) {
	try {
		Trainer.findById(req.params.id)
		.populate('gender_id',['name'])
		.exec(function (err, data) {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching member details.',
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
			message: 'Server Error.',
		});
    }
};

exports.EditTrainer = function (req, res) {
	try {
		Trainer.findByIdAndUpdate({_id : req.body._id}, {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			gender_id: req.body.gender_id,
			dob: req.body.dob,
			address: req.body.address,
			experience: req.body.experience,
			photo: req.body.photo,
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update trainer details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Trainer details updated successfully.',
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

exports.DeleteTrainer = function (req, res) {
	try {
		Trainer.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete trainer.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Trainer deleted successfully.'  
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