const db = require('../../data/dbConfig');



const add =  (potluckID,item) => {
    return db('items').insert(potluckID,item)
}


module.exports = {
    add
}