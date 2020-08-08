const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EnrollmentFeeSchema = new Schema({
	user_id: {type: String, required: true, index: true},
    fee: {type: String, required: true},
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('enrollment_fees', EnrollmentFeeSchema);

