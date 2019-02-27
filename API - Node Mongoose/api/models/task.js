const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // created_by: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // assigned_to: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    created_by: String,
    assigned_to: String,
    name: String,
    description: String,
    completed: {type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);

/* Use to post object */
// {
// "created_by": ID
// "assigned_to": ID
// "name": "First Task",
// "description": "First Description",
// "completed": false
// }