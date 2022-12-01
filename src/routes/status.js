const express = require('express');
const { createStatus, getAllStatus, updateStatus } = require('../controllers/status');

const router = express.Router();

router.post('/status', createStatus);
router.get('/status', getAllStatus);
router.put('/status/:id', updateStatus);

module.exports = router;