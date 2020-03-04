const db = require('../../data/dbConfig');

const add =  (guest) => {
   return db('guests').insert(guest);
}

const findById = (id) => {
        
    return db('guests')
                .where({potluckID: id});
              

}

module.exports = {
    add, 
    findById
}