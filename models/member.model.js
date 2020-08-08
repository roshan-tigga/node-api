const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MemberSchema = new Schema({
    user_id: {type: String, required: true, index: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    //gender_id: {type: String, index: true},
    gender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'genders', required: true, index: true },
    dob: {type: Date, required: true},
    address: {type: String, required: true},
    height: {type: String, required: true},
	photo: {type: String, required: true},
	plan_details:{
		plan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'plans', required: true, index: true },
		plan_price: {type: String, required: true},
		start_date: {type: Date, required: true},
		end_date: {type: Date, required: true},
		payment_method_id: {type: String, required: true, index: true},
		paid_amount: {type: Number},
		enrollment_fee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'enrollment_fees', required: true, index: true },
		discount_type_id: {type: String, required: true, index: true}
	},
	tax_applicable: {
		tax_amount: {type: Number, required: true},
		due_amount: {type: Number, required: true},
		due_amount_reminder: {type: Number, required: true},
		batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batchs', required: true, index: true },
		bill_date: Date
	},
	other_details: {
		document_file: {type: String, required: true},
		dob: {type:Date, required: true},
		email: {type: String, required: true},
		care_of: {type: String, required: true},
		unique_id: {type: String, required: true},
		company_name: {type: String, required: true},
		company_gst: {type: String, required: true},
		marriage_anniversary: {type:Date, required: true},
		remark: {type: String, required: true}
	},
	created_by_user_id:String,
	updated_by_user_id:String,
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('members', MemberSchema);