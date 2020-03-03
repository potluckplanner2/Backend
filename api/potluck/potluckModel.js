const db = require('../../data/dbConfig');
const itemsDB = require('../items/itemsModel')
const guestDB = require('../guests/guestModel')

const find = () => {
    return db('potlucks');
}

const findById = id => {

    const userID = parseInt(id)
    console.log('in find by id', id)
    return db('potlucks')
        .select('id', 'title', 'description', 'date', 'userID')
        .where({userID: userID});
   

}

const add = async (potluck) => {

    console.log(potluck)
    const items = potluck.items;
    const guest = potluck.guests;
    const title = potluck.title;
    const description = potluck.description;
    const date = potluck.date;
    const userID = potluck.userID;
    //console.log(id)
    const potluckObj = {
        title,
        description,
        date,
        userID
    }
    console.log(potluckObj)

    const [potluckID] = await db('potlucks').insert(potluckObj, 'id');
    console.log('potluckID', potluckID)

    return potluckID;

}

const batchAddItems = (potluckID, items) => {

    console.log('In batch items', items)
    if(!items.length === 0)
    {
        for(let i = 0; i < items.length; i++){
            itemsDB.add(potluckID,items[i])

        }
    }

} 

const batchAddGuest = (potluckID, guests) => {

    console.log('In batch guests',guests)
    console.log(guests.length)
    if(!guests.length === 0)
    {
        for(let i = 0; i < guests.length; i++){
            console.log('potluck ID & guest', potluckID,guests[i])
            guestDB.add(potluckID,guests[i])

        }
    }
} 



module.exports = {
    find,
    findById,
    add
}