const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_role_id: {type: Number, required: true, index: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
	country_id: {type: String, index: true},
    state_id: {type: String, index: true},
    city_id: {type: String, index: true},
    address: {type: String},
	permissions:{type: String},
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('users', UserSchema);

