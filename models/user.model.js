const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    user_role_id: {type: String, required: true},
	permissions:{type: String},
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('users', UserSchema);

