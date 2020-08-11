const { check, validationResult} = require("express-validator/check");
const Tax = require('../models/tax.model');

exports.AddTax = function (req, res) {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
	
		let tax = new Tax(
			{
				user_id:req.userId,
				gym_id:req.body.gym_id,
				tax: req.body.tax,
				percentage: req.body.percentage,
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		tax.save(function (err) {
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in created tax.'
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Tax created successfully.'
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

exports.GetAllTax = function (req, res) {
	try {
		Tax.find({}, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching tax details.',
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
}

exports.GetTaxById = function (req, res) {
	try {
		Tax.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching tax details.',
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

exports.EditTax = function (req, res) {
	try {
		Member.findByIdAndUpdate({_id : req.body._id}, {
			tax: req.body.tax,
			percentage: req.body.percentage,
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update tax details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Tax details updated successfully.',
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

exports.DeleteTax = function (req, res) {
	try {
		Tax.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete tax.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Tax deleted successfully.'  
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


