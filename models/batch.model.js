const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BatchSchema = new Schema({
    user_id: {type: String, required: true, index: true},
    name: {type: String},
    limit: {type: String},
    open_time: {type: String},
    close_time: {type: String},
	created_by_user_id:String,
	updated_by_user_id:String,
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('batchs', BatchSchema);

