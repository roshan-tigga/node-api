const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TrainerSchema = new Schema({
    user_id: {type: String, required: true, index: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
	gender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'genders', required: true },
    dob: {type: Date, required: true},
    address: {type: String, required: true},
    experience: {type: String, required: true},
    photo: {type: String, required: true},
	created_by_user_id:String,
	updated_by_user_id:String,
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('trainers', TrainerSchema);

