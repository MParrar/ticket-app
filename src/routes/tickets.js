const express = require('express');
const { createTicket, getWeeklyTicket, getAllTickets, updateTicket, finishTicket, deleteTicket } = require('../controllers/ticket');

const router = express.Router();

router.post('/ticket', createTicket);
router.get('/weekly-tickets', getWeeklyTicket);
router.get('/tickets', getAllTickets);
router.put('/ticket/:id', updateTicket);
router.delete('/ticket/:id', deleteTicket);
router.put('/ticket-finish/:id', finishTicket);

module.exports = router;