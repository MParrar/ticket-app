const { response } = require('express');
const Category = require('../models/Category');


const createCategory = async (req, res = response) => {

    const category = new Category({ ...req.body });

    try {

        const categorySaved = await category.save();

        res.status(201).json({
            ok: true,
            category: categorySaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try save category'
        });
    }

}


const getAllCategories = async (req, res = response) => {

    try {

        const categories = await Category.find();
        res.status(200).json({
            ok: true,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try get categories'
        });
    }
}


const updateCategory = async (req, res = response) => {
    try {
        const { name, color } = req.body;
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category)
            return res
                .status(404)
                .json({ ok: false, msg: 'Category does not exist' });

        category.name = name;
        category.color = color;

        const categoryUpdated = await Category.findOneAndUpdate(
            { _id: id },
            { $set: category },
            { new: true }
        );

        return res.json({ ok: true, msg: 'Category was updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error while to try update category');
    }
};



module.exports = {
    createCategory,
    getAllCategories,
    updateCategory
}