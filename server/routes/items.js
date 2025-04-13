const express = require('express');
const {
    getItems,
    getItem,
    getItemImage,
    createItem,
    deleteItem,
    updateItem
} = require('../controllers/itemController');

module.exports = function(upload) {
    const router = express.Router();

    router.get('/', getItems);
    router.get('/:id', getItem);
    router.get('/:id/image', getItemImage);
    router.post('/', upload.single('image'), createItem);
    router.delete('/:id', deleteItem);
    router.patch('/:id', updateItem);
    router.put('/:id', updateItem);

    return router;
};