const Item = require('../models/itemModel');
const mongoose = require('mongoose');

// GET all items
const getItems = async (req, res) => {
    try {
        const items = await Item.find({}).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET single item
const getItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Nieprawidłowe ID przedmiotu' });
    }

    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET item image
const getItemImage = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item?.image?.data) {
            return res.status(404).json({ error: 'Obraz nie znaleziony' });
        }
        res.set('Content-Type', item.image.contentType);
        res.send(item.image.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST new item
const createItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const image = req.file;

        if (!image) {
            return res.status(400).json({ error: 'Obraz jest wymagany' });
        }

        const newItem = await Item.create({
            name,
            price,
            image: {
                data: image.buffer,
                contentType: image.mimetype
            }
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE item
const deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Nieprawidłowe ID przedmiotu' });
    }

    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE item
const updateItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Nieprawidłowe ID przedmiotu' });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getItems,
    getItem,
    getItemImage,
    createItem,
    deleteItem,
    updateItem
};