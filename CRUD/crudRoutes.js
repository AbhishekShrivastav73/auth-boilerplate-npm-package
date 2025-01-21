const express = require('express');

const createCrudRouter = (Model) => {
    if (!Model) {
        throw new Error('A valid Mongoose model is required!');
    }

    const router = express.Router();

    // Create a new record
    router.post('/', async (req, res) => {
        try {
            const newRecord = new Model(req.body);
            await newRecord.save();
            res.status(201).json({ message: 'Record created successfully!', data: newRecord });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Read all records
    router.get('/', async (req, res) => {
        try {
            const records = await Model.find();
            res.status(200).json({ data: records });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Read a single record by ID
    router.get('/:id', async (req, res) => {
        try {
            const record = await Model.findById(req.params.id);
            if (!record) {
                return res.status(404).json({ error: 'Record not found!' });
            }
            res.status(200).json({ data: record });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update a record by ID
    router.put('/:id', async (req, res) => {
        try {
            const updatedRecord = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedRecord) {
                return res.status(404).json({ error: 'Record not found!' });
            }
            res.status(200).json({ message: 'Record updated successfully!', data: updatedRecord });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete a record by ID
    router.delete('/:id', async (req, res) => {
        try {
            const deletedRecord = await Model.findByIdAndDelete(req.params.id);
            if (!deletedRecord) {
                return res.status(404).json({ error: 'Record not found!' });
            }
            res.status(200).json({ message: 'Record deleted successfully!' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};

module.exports = createCrudRouter;

