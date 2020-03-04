const jwt = require('jsonwebtoken');
const express = require('express');
const Guests = require('./guestModel');
const router = express.Router();

router.post('/guests/:id', (req,res) => {
    const {id} = req.params;

    const guest = req.body.guest;
    console.log(id)
    console.log(guest)
   

    const newItem = {potluckID: id, guest_name: guest}

    Guests
        .add(newItem)
        .then(item => {

            res.status(201).json({message: 'Guest added to potluck'})

        }).catch(error => res.status(500).json(error))

})


router.delete('/guests/:id', (req,res) => {
    const {id} = req.params;

    Guests
        .remove(id)
        .then(item => {
            res.status(200).json({message: 'Guest deleted'})
        })
})

module.exports = router;