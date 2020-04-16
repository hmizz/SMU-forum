const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {type: String, required:true},
    organizer: {type: String, required:true},
    date:{type: String, required: true },
    location: {type: String, required: true},
    description: {type: String},
    topic: {type: String}
});

module.exports = mongoose.model('Event', eventSchema);