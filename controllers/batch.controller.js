const bcrypt = require('bcrypt');
const { check, validationResult} = require("express-validator/check");
const Batch = require('../models/complaint.model');

exports.AddBatch = function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
		
		let batch = new Batch(
			{
				user_id:req.userId,
				name: req.body.name,
				limit: req.body.limit,
				open_time: req.body.open_time,
				close_time: req.body.close_time,
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		batch.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in created batch.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Batch created successfully'
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


exports.GetBatch = function (req, res) {
	try {
		Batch.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching batch details.'
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

exports.EditBatch = function (req, res) {
	try {
		Batch.findByIdAndUpdate({_id : req.body._id}, {
			name: req.body.name,
			limit: req.body.limit,
			open_time: req.body.open_time,
			close_time: req.body.close_time,
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update batch details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Batch details updated successfully.',
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

exports.DeleteBatch = function (req, res) {
	try {
		Batch.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete batch.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Batch deleted successfully.'  
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