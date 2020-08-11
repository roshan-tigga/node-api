const { check, validationResult} = require("express-validator/check");
const Member = require('../models/member.model');

exports.AddMember = function (req, res) {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'Error',
			code: '400',
			errors: errors.array()
		});
	} 
	
	try {
		
		Member.findOne({email: req.body.email}, function(err, user) {
		   if (user) {
				return res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Member email id already exists.'
				});
		   } 
		}); 
		
		let member = new Member(
			{
				user_id:req.userId,
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				gender_id: req.body.gender_id,
				dob: req.body.dob,
				address: req.body.address,
				height: req.body.height,
				photo: req.body.photo,
				plan_details: {
					plan_id: req.body.plan_details.plan_id,
					plan_price: req.body.plan_details.plan_price,
					start_date: Date(req.body.plan_details.start_date),
					end_date: Date(req.body.plan_details.end_date),
					payment_method_id: req.body.plan_details.payment_method_id,
					paid_amount: req.body.plan_details.paid_amount,
					enrollment_fee_id: req.body.plan_details.enrollment_fee_id,
					discount_type_id: req.body.plan_details.discount_type_id
				},
				tax_applicable: {
					tax_amount: req.body.tax_applicable.tax_amount,
					due_amount: req.body.tax_applicable.due_amount,
					due_amount_reminder: req.body.tax_applicable.due_amount_reminder,
					batch_id: req.body.tax_applicable.batch_id,
					bill_date: Date(req.body.tax_applicable.bill_date)
				},
				other_details: {
					document_file: req.body.other_details.document_file,
					dob: req.body.other_details.dob,
					email: req.body.other_details.email,
					care_of: req.body.other_details.care_of,
					unique_id: req.body.other_details.unique_id,
					company_name: req.body.other_details.company_name,
					company_gst: req.body.other_details.company_gst,
					marriage_anniversary: req.body.other_details.marriage_anniversary,
					remark: req.body.other_details.remark
				},
				created_by_user_id:req.userId,
				updated_by_user_id:null,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
				status: 1
			}
		);

		member.save(function (err) {
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in created member.',
					error:err
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Member created successfully.'
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


exports.GetAllMember = function (req, res) {
	try {
		Member.find()
		.populate('gender_id',['name'])
		.populate('plan_details.plan_id',['plan_type_id','plan_name','amount','duration','description'])
		.populate('plan_details.enrollment_fee_id',['fee'])
		.populate('plan_details.batch_id',['name','limit','open_time','close_time'])
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
			message: 'Error on the server.',
		});
    }
}

exports.GetMemberById = function (req, res) {
	try {
		Member.findById(req.params.id)
		.populate('gender_id',['name'])
		.populate('plan_details.plan_id',['plan_type_id','plan_name','amount','duration','description'])
		.populate('plan_details.enrollment_fee_id',['fee'])
		.populate('plan_details.batch_id',['name','limit','open_time','close_time'])
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
			message: 'Error on the server.',
		});
    }
};

exports.EditMember = function (req, res) {
	try {
		console.log(req.body); 
		Member.findByIdAndUpdate({_id : req.body._id}, {	
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			gender_id: req.body.gender_id,
			dob: req.body.dob,
			address: req.body.address,
			height: req.body.height,
			photo: req.body.photo,
			plan_details: {
				plan_id: req.body.plan_details.plan_id,
				plan_price: req.body.plan_details.plan_price,
				start_date: Date(req.body.plan_details.start_date),
				end_date: Date(req.body.plan_details.end_date),
				payment_method_id: req.body.plan_details.payment_method_id,
				paid_amount: req.body.plan_details.paid_amount,
				enrollment_fee_id: req.body.plan_details.enrollment_fee_id,
				discount_type_id: req.body.plan_details.discount_type_id
			},
			tax_applicable: {
				tax_amount: req.body.tax_applicable.tax_amount,
				due_amount: req.body.tax_applicable.due_amount,
				due_amount_reminder: req.body.tax_applicable.due_amount_reminder,
				batch_id: req.body.tax_applicable.batch_id,
				bill_date: Date(req.body.tax_applicable.bill_date)
			},
			other_details: {
				document_file: req.body.other_details.document_file,
				dob: req.body.other_details.dob,
				email: req.body.other_details.email,
				care_of: req.body.other_details.care_of,
				unique_id: req.body.other_details.unique_id,
				company_name: req.body.other_details.company_name,
				company_gst: req.body.other_details.company_gst,
				marriage_anniversary: req.body.other_details.marriage_anniversary,
				remark: req.body.other_details.remark
			},
			updated_by_user_id:req.userId,
			updated_at: new Date()
		}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in update member details.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message: 'Member details updated successfully.',
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

exports.DeleteMember = function (req, res) {
	try {
		Member.findByIdAndUpdate({_id : req.body._id}, {
				status:'0',
				updated_by_user_id:req.userId,
				deleted_at:new Date()
			}, { new : true }, (err, data) =>{ 
			if (err){
				res.status(400).json({
					status: 'Error',
					code: '400',
					message: 'Error in delete member.',
				});
			}
			res.status(200).json({
				status: 'Success',
				code: '200',
				message:'Member deleted successfully.'  
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