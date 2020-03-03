const db = require('../../data/dbConfig');

const find = () => {
    return db('users');
}

const findByName = name => {
    console.log(name.username)
    
    return db('users')
    .select('id','username','password')
    .where({username: name.username});
}

const add =  user => {
    return db('users').insert(user)
}

module.exports = {
    find,
    findByName,
    add
}