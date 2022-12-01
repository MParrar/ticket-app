const express = require('express');
const { createCategory, getAllCategories, updateCategory } = require('../controllers/category');

const router = express.Router();

router.post('/category', createCategory);
router.get('/categories', getAllCategories);
router.put('/category/:id', updateCategory);

module.exports = router;