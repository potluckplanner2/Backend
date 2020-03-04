const db = require('../../data/dbConfig');

const find = () => {
    return db('potlucks');
}

const findById = (id) => {

    console.log('in find by id', id)
    return db('potlucks')
        .select('id', 'title', 'description', 'date', 'userID')
        .where({id});
}

const remove = (id) => {

    console.log('in remove', id)
    return db('potlucks')
            .where({id: id})
            .del();

}

const add = async (potluck) => {

    console.log(potluck)
    const items = potluck.items;
    const guest = potluck.guests;
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

    /*if(!guest.length === 0){
        const batchGuest = 

    }*/
    
    console.log(potluckObj)

    const [potluckID] = await db('potlucks').insert(potluckObj, 'id');
    console.log('potluckID', potluckID)

    return potluckID;

}



module.exports = {
    find,
    findById,
    add,
    remove
}