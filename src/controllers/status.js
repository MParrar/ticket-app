const { response } = require('express');
const Status = require('../models/Status');


const createStatus = async (req, res = response) => {

    const status = new Status({ ...req.body });

    try {

        const statusSaved = await status.save();

        res.status(201).json({
            ok: true,
            status: statusSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try save status'
        });
    }

}


const getAllStatus = async (req, res = response) => {

    try {

        const status = await Status.find();
        res.status(200).json({
            ok: true,
            status
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while to try get all status'
        });
    }
}


const updateStatus = async (req, res = response) => {
    try {
        const { name, color } = req.body;
        const { id } = req.params;

        const status = await Status.findById(id);

        if (!status)
            return res
                .status(404)
                .json({ ok: false, msg: 'Status does not exist' });

        status.name = name;
        status.color = color;

        const updatedStatus = await Status.findOneAndUpdate(
            { _id: id },
            { $set: status },
            { new: true }
        );

        return res.json({ ok: true, msg: 'Status was updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error while to try update status');
    }
};



module.exports = {
    createStatus,
    getAllStatus,
    updateStatus
}