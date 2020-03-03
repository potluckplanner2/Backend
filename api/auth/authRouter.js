const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const Users = require('../users/userModel')

const router = express.Router();


router.get('/test', (req,res) => {
Users.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
})

router.post('/register', validateRegister, (req, res) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;

    Users
        .add(userInfo)
        .then(user => {
            delete user.password;
            const token =  signToken(user);

            const response = {
                user,
                token
            }

            res.status(201).json(response);
        }).catch(error => res.status(500).json(error))

})

router.post('/login', validateLogin, (req, res) => {
    
    const {username} = req.body;
  
    Users
      .findByName({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          delete user.password;
   
          const token = signToken(user);
          const response = {
            user,
            token
          }
          res.status(200).json(response);
        } else {
          res.status(404).json({ message: 'username or password is invalid' });
        }
      })
      .catch(error => res.status(500).json(error));
  })


  async function validateLogin(req, res, next) {
    const { username, password } = req.body;
    const entries = Object.entries(req.body);
  
    if (!entries.length) {
      return res.status(400).json({ message: 'no request body attached' });
    }
  
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  
    if (!username) {
      return res.status(400).json({ message: 'must include a valid email' });
    }
  
    if (!password) {
      return res.status(400).json({ message: 'must include password' });
    }

    next();
  
  }


async function validateRegister(req, res, next) {
    const { username , password} = req.body;
    const entries = Object.entries(req.body);
  
    if (!entries.length) {
      return res.status(400).json({ message: 'no request body attached' });
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  
    if (!username) {
      return res.status(400).json({ message: 'must include a valid username' });
    }
  
    if (!password) {
      return res.status(400).json({ message: 'must include password' });
    }
  
    if (!passwordPattern.test(password)) {
      return res.status(400).json({ message: 'password must include a number, special character, and be a minimum of 6 characters' });
    }
  
    next();
  
  }

function signToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }
    
    const secret = process.env.JWT_SECRET;
    
    const options = { expiresIn: '1h' };
    
    return jwt.sign(payload, secret, options);
}

module.exports = router;