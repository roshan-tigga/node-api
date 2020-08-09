const { check, validationResult} = require("express-validator/check");
const Plan = require('../models/plan.model');

exports.AddPlan = function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	try {
		let plan = new Plan(
			{
				user_id:req.userId,
				plan_type_id: req.body.plan_type_id,
				plan_name: req.body.plan_name,
				amount: req.body.amount,
				duration: req.body.duration,
				description: req.body.description,
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		plan.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in created plan.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Plan created successfully' 
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

exports.GetPlan = function (req, res) {
	try {
		Plan.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching plan details.'
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

exports.EditPlan = function (req, res) {
	try {
		Plan.findByIdAndUpdate({_id : req.body._id}, {
			plan_type_id: req.body.plan_type_id,
			plan_name: req.body.plan_name,
			amount: req.body.amount,
			duration: req.body.duration,
			description: req.body.description,
			updated_by_user_id:req.userId,
			updated_at: new Date(),
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update plan details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Plan details updated successfully.',
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

exports.DeletePlan = function (req, res) {
	try {
		Plan.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete plan.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Plan deleted successfully.'  
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

