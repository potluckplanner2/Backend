const jwt = require('jsonwebtoken');
const express = require('express');
const Items = require('./itemsModel');

const router = express.Router();

router.post('/items/:id', (req,res) => {
    const {id} = req.params;

    const item = req.body.item;
    console.log(id)
    console.log(item)

    const newItem = {potluckID: id, items: item}

    Items
        .add(newItem)
        .then(item => {

            res.status(201).json({message: 'Item added to potluck'})

        }).catch(error => res.status(500).json(error))

})

router.delete('/items/:id', (req,res) => {
    const {id} = req.params;

    Items
        .remove(id)
        .then(item => {
            res.status(200).json({message: 'item deleted'})
        })
})

module.exports = router;