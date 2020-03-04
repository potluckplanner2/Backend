const db = require('../../data/dbConfig');



const add =  (item) => {
    return db('items').insert(item)
}

const findById = (id) => {
        
    return db('items')
                .where({potluckID: id});

}


module.exports = {
    add,
    findById
}