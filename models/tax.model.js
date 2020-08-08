const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaxSchema = new Schema({
	user_id: {type: String, required: true, index: true},
	gym_id: {type: String, required: true, index: true},
    tax: {type: String, required: true},
    percentage: {type: String, required: true},
	created_by_user_id:String,
	updated_by_user_id:String,
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('taxes', TaxSchema);

