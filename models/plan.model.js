const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlanSchema = new Schema({
    user_id: {type: String, required: true, index: true},
    plan_type_id: {type: String, required: true, index: true},
    plan_name: {type: String, required: true},
    amount: {type: String, required: true},
    duration: {type: String, required: true},
    description: {type: String, required: true},
	created_by_user_id:String,
	updated_by_user_id:String,
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('plans', PlanSchema);

