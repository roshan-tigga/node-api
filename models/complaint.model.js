const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ComplaintSchema = new Schema({
    user_id: {type: String, required: true, index: true},
    description: {type: String},
    file: {type: String},
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('complaints', ComplaintSchema);

