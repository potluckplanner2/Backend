const db = require('../../data/dbConfig');



const add =  (potluckID,item) => {
    return db('items').insert(potluckID, item)
}

const findById = (id) => {
        
    return db('items')
                .where({potluckID: id});

}

const remove = (id) => {

    console.log('in remove', id)
    return db('items')
            .where({id: id})
            .del();

}

function update(changes, id){
    return db('items')
            .where({id})
            .update(changes);
}


module.exports = {
    add,
    findById,
    update,
    remove
}