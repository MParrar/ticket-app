const { response } = require('express');
const { getCurrentWeek } = require('../helpers');
const Ticket = require('../models/Ticket');


const createTicket = async (req, res = response) => {

    const now = Date.now();
    console.log(req.body)
    const ticket = new Ticket({ ...req.body, date: now, status: '6382931599d3e2c4bbbe2041' });

    try {

        const ticketSaved = await ticket.save();

        res.status(201).json({
            ok: true,
            ticket: ticketSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try save ticket'
        });
    }

}

const getWeeklyTicket = async (req, res = response) => {
    try {

        const currentWeek = getCurrentWeek();
        const weeklyTickets = await Ticket.find({
            $and: [
                { date: { $gt: new Date(currentWeek[0]) } },
                { date: { $lt: new Date(currentWeek[1]) } },
            ],
        }).populate('status', '_id, name')
            .populate('category', '_id, name');

        res.status(200).json({
            ok: true,
            weeklyTickets
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try get weekly tickets'
        });
    }
}


const getAllTickets = async (req, res = response) => {

    try {

        const tickets = await Ticket.find().populate('status', '_id, name')
            .populate('category', '_id, name');
        res.status(200).json({
            ok: true,
            tickets
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try get all tickets'
        });
    }
}


const updateTicket = async (req, res = response) => {
    try {
        const { requester, issue, status, category, response } = req.body;
        console.log(requester, issue, status, category, response)
        const { id } = req.params;
        console.log('id:', id)

        const ticket = await Ticket.findById(id);

        if (!ticket)
            return res
                .status(404)
                .json({ ok: false, msg: 'Ticket does not exist' });

        ticket.requester = requester;
        ticket.issue = issue;
        ticket.status = status;
        ticket.category = category;
        ticket.response = response;
        console.log('el ticket:', ticket)
        const updatedTicket = await Ticket.findOneAndUpdate(
            { _id: id },
            { $set: ticket },
            { new: true }
        );

        return res.json({ ok: true, msg: 'Ticket was updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
};


const finishTicket = async (req, res = response) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket)
            return res
                .status(404)
                .json({ ok: false, msg: 'Ticket does not exist' });

        ticket.status = '6386a0cffaee1c50e8f8af40'

        const updatedTicket = await Ticket.findOneAndUpdate(
            { _id: id },
            { $set: ticket },
            { new: true }
        );

        return res.json({ ok: true, msg: 'Ticket was updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
};


const deleteTicket = async (req, res = response) => {

    const ticketId = req.params.id

    try {
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({
                ok: false,
                msg: 'Ticket does not exist'
            })
        }

        await Ticket.findByIdAndDelete(ticketId);

        res.status(200).json({
            ok: true,
            msg: 'Ticket was deleted'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mesg: 'Error'
        })
    }
}

module.exports = {
    createTicket,
    getWeeklyTicket,
    getAllTickets,
    updateTicket,
    finishTicket,
    deleteTicket
}