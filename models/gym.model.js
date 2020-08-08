const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GymSchema = new Schema({
    user_id: {type: String, required: true, index: true},
    organization_name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    website: {type: String, required: true},
    country_id: {type: String, required: true, index: true},
    state_id: {type: String, required: true, index: true},
    city_id: {type: String, required: true, index: true},
    address: {type: String, required: true},
    owner_contact_no: {type: Number, required: true},
    currency_id: {type: Number, required: true},
    gst_no: {type: String, required: true},
    auto_email_send: {type: Boolean},
    terms_and_condition: {type: Boolean},
    photo: {type: String, required: true},
	created_by_user_id:String,
	updated_by_user_id:String,
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('gyms', GymSchema);