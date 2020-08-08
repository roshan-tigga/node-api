const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GenderSchema = new Schema({
    name: {type: String},
    created_at: { type: Date},
    updated_at: { type: Date},
    deleted_at: { type: Date},
    status: {type: Boolean}
});

module.exports = mongoose.model('genders', GenderSchema);

