const jwt = require('jsonwebtoken');
const express = require('express');
const potlucks = require('../potluck/potluckModel')

const router = express.Router();

router.get('/potluck', (req,res) => {
    potlucks
        .find()
        .then(meals => {
            res.status(200).json(meals)
        })
        
})

router.post('/potluck', (req,res) =>{
    const potluck = req.body;
    potluck.userID = req.decoded_token.id;

    potlucks
        .add(potluck)
        .then(potluckID => {
            res.status(201).json({potluckID: potluckID})
        }).catch(error => res.status(500).json(error))
})

router.get('/potlucks', (req,res) => {
    const id = req.decoded_token.id;
    console.log(id)

    potlucks
        .findById(id)
        .then(potlucks => {
            res.status(200).status(potlucks)
        }).catch(error => res.status(500).json(error))


})

router.delete('/potluck/:id', (req,res) => {
    const {id} = req.params;
    

    potlucks
        .remove(id)
        .then(deleted => {
            res.json({ removed: deleted });
        })
        .catch(error => res.status(500).json(error))
})

router.put('/potluck/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    potlucks.findById(id)
        .then(potluck => {
            console.log(potluck)
            if(potluck){
                potlucks.update(changes, id)
                .then(updatePotluck => {
                    res.json(updatePotluck);
                })
            }else {
                res.status(404).json({ message: 'Could not find potluck with given id' });
            }
        }).catch (err => {
            res.status(500).json(err);
          });
})

module.exports = router;