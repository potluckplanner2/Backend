const db = require('../../data/dbConfig');

const find = () => {
    return db('potlucks');
}

const findById = (id) => {
        
    return db('potlucks')
                .where({id: id})
                .first();

}

const findUserPotlucks = (id) => {

    console.log('in find potlucks', id)
    return db('potlucks')
        .where({userID: id});

}

const remove = (id) => {

    console.log('in remove', id)
    return db('potlucks')
            .where({id: id})
            .del();

}

function update(changes, id){
    return db('potlucks')
            .where({id})
            .update(changes);
}

const add = (potluck) => {

    const title = potluck.title;
    const description = potluck.description;
    const date = potluck.date;
    const userID = potluck.userID;
    const potluckObj = {
        title,
        description,
        date,
        userID
    }

    return db('potlucks').insert(potluckObj, 'id');

}



module.exports = {
    find,
    findById,
    findUserPotlucks,
    add,
    remove,
    update
}