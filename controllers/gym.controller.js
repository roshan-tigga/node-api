const { check, validationResult} = require("express-validator/check");
const Gym = require('../models/gym.model');

exports.AddGym = function (req, res) {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
		let gym = new Gym(
			{
				user_id:req.userId,
				organization_name: req.body.organization_name,
				email: req.body.email,
				phone: req.body.phone,
				website: req.body.website,
				country_id: req.body.country_id,
				state_id: req.body.state_id,
				city_id: req.body.city_id,
				address: req.body.address,
				owner_contact_no: req.body.owner_contact_no,
				currency_id: req.body.currency_id,
				gst_no: req.body.gst_no,
				auto_email_send: req.body.auto_email_send,
				terms_and_condition: req.body.terms_and_condition,
				photo: req.body.photo,
				
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		gym.save(function (err) {
			if (err){
				res.json({
					status: 'Error',
					code: '400',
					message: 'Error in create gym.'
				});
			}
			res.json({
				status: 'Success',
				code: '200',
				message: 'Gym created successfully.' 
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


exports.GetGym = function (req, res) {
	try {
		Gym.findById(req.params.id, (err, data) => {
			 if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in fetching gym details.',
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

exports.EditGym = function (req, res) {
	try {
		Gym.findByIdAndUpdate({_id : req.body._id}, {
			organization_name: req.body.organization_name,
			email: req.body.email,
			phone: req.body.phone,
			website: req.body.website,
			country_id: req.body.country_id,
			state_id: req.body.state_id,
			city_id: req.body.city_id,
			address: req.body.address,
			owner_contact_no: req.body.owner_contact_no,
			currency_id: req.body.currency_id,
			gst_no: req.body.gst_no,
			auto_email_send: req.body.auto_email_send,
			terms_and_condition: req.body.terms_and_condition,
			photo: req.body.photo,
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update gym details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Gym details updated successfully.',
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

exports.DeleteGym = function (req, res) {
	try {
		Gym.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete gym.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Gym deleted successfully.'  
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