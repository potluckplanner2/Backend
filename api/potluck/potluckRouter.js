const jwt = require('jsonwebtoken');
const express = require('express');
const Potlucks = require('../potluck/potluckModel')
const Guest = require('../guests/guestModel');
const Items = require('../items/itemsModel');

const router = express.Router();

router.get('/potluck', (req,res) => {
    Potlucks
        .find()
        .then(meals => {
            res.status(200).json(meals)
        }).catch(error => res.status(500).json(error))
        
})

router.post('/potluck', (req,res) =>{
    const potluck = req.body;
    potluck.userID = req.decoded_token.id;
    const potluckItems = potluck.items;
    const guests = potluck.guests;

    Potlucks
        .add(potluck)
        .then(ID => {

            const guestToInsert = guests.map(guest => ({
                potluckID: ID[0], guest_name: guest
            }))

            console.log(guestToInsert)
            Guest
                .add(guestToInsert)
                .then(guest => {

                    const itemsToInsert = potluckItems.map(item => ({
                        potluckID: ID[0], items: item
                    }))
                    Items
                        .add(itemsToInsert)
                        .then(item => {
                            res.status(201).json({message: 'Added potluck'})
                        })
                    
                }).catch(error => res.status(500).json(error))
        

        }).catch(error => res.status(500).json(error))
})

router.get('/potlucks', (req,res) => {
    const id = req.decoded_token.id;
    console.log(id)

    Potlucks
        .findUserPotlucks(id)
        .then(potlucks => {

            res.status(200).json(potlucks)
        }).catch(error => res.status(500).json(error))
})

router.delete('/potluck/:id', (req,res) => {
    const {id} = req.params;

    Potlucks
        .remove(id)
        .then(deleted => {
            res.json({ removed: deleted });
        })
        .catch(error => res.status(500).json(error))
})

router.put('/potluck/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    Potlucks.findById(id)
        .then(potluck => {
            console.log(potluck)
            if(potluck){
                Potlucks.update(changes, id)
                .then(updatePotluck => {
                    res.json(updatePotluck);
                })
            }else {
                res.status(404).json({ message: 'Could not find potluck with given id' });
            }
        }).catch (err => { res.status(500).json(err); });
})


router.get('/potluck/:id', (req,res) => {
    const {id} = req.params;
    const fullPotluck = {}

    Potlucks
        .findById(id)
        .then(potluck => {

            fullPotluck.potluck = potluck;

            Items
                .findById(id)
                .then(items => {
                    fullPotluck.items = items;

                    Guest
                        .findById(id)
                        .then(guest => {
                            fullPotluck.guests = guest;
                            res.status(200).json(fullPotluck)
                        })
                })

        }).catch (err => { res.status(500).json(err);});
})

module.exports = router;