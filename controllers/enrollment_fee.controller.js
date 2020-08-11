const { check, validationResult} = require("express-validator/check");
const Enrollmentfee = require('../models/enrollment_fee.model');

exports.AddEnrollmentFee = function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
		let enrollmentfee = new Enrollmentfee(
			{
				user_id:req.userId,
				fee: req.body.fee,
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		enrollmentfee.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in created enrollment fee.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Enrollment fee created successfully'  
			});         
		});
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the error server.',
		});
    }
};


exports.GetAllEnrollmentFee = function (req, res) {
	try {
		Enrollmentfee.find({}, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching enrollment fee details.',
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
			message: 'Error on the error server.',
		});
    }
};

exports.GetEnrollmentFeeById = function (req, res) {
	try {
		Enrollmentfee.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching enrollment fee details.',
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
			message: 'Error on the error server.',
		});
    }
};



exports.EditEnrollmentFee = function (req, res) {
	try {
		Enrollmentfee.findByIdAndUpdate({_id : req.body._id}, {
			fee: req.body.fee,
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update enrollment fee details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Enrollment fee details updated successfully.',
			});  
		});
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the error server.',
		});
    }
};

exports.DeleteEnrollmentFee = function (req, res) {
	try {
		Enrollmentfee.findByIdAndUpdate({_id : req.body._id}, {
			status:'0',
			updated_by_user_id:req.userId,
			deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete enrollment fee.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Enrollment fee deleted successfully.'  
			});  
		});
	}
	catch (err) {
       res.status(500).json({
			status: 'Error',
			code: '500',
			message: 'Error on the error server.',
		});
    }
};