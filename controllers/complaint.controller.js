const bcrypt = require('bcrypt');
const { check, validationResult} = require("express-validator/check");
const Complaint = require('../models/complaint.model');

exports.AddComplaint = function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
	
		let complaint = new Complaint(
			{
				user_id:req.userId,
				description: req.body.description,
				file: req.body.file,
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		complaint.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in created complaint.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Complaint created successfully'  
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


exports.GetComplaint = function (req, res) {
	try {
		Complaint.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching complaint details.'
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

exports.EditComplaint = function (req, res) {
	try {
		Complaint.findByIdAndUpdate({_id : req.body._id}, {
			description: req.body.description,
			file: req.body.file,
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update complaint details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Complaint details updated successfully.',
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

exports.DeleteComplaint = function (req, res) {
	try {
		Complaint.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete complaint.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Complaint deleted successfully.'  
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