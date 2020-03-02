const db = require('../../data/dbConfig');

const find = () => {
    return db('users');
}


const findBy = id => {
    return db('users')
        .select('users.id', 'users.name', 'users.password')
        .where(id === 'users.id')
}

const add =  user => {
    return db('users').insert(user)

}


module.exports = {
    find,
    findBy,
    add
}