const db = require('../../data/dbConfig');



const add =  (potluckID,guest_name) => {
    db('guests').insert(potluckID,guest_name);
}


module.exports = {
    add
}