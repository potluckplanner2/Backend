const db = require('../../data/dbConfig');

const add =  (guest) => {
   return db('guests').insert(guest);
}

const findById = (id) => {
        
    return db('guests')
                .where({potluckID: id});
}

const remove = (id) => {

    console.log('in remove', id)
    return db('guests')
            .where({id: id})
            .del();

}

function update(changes, id){
    return db('guests')
            .where({id})
            .update(changes);
}


module.exports = {
    add, 
    findById,
    remove
}