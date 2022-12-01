const mongoose = require('mongoose');
const Status = require('./Status');
const Category = require('./Category');

const ticketSchema = mongoose.Schema({
    requester: {
        type: String
    },
    issue: {
        type: String
    },
    status: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },
    date: {
        type: Date
    },
    response: {
        type: String
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Status,
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);