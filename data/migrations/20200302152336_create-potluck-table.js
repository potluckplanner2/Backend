
exports.up = function(knex) {
    return knex.schema.createTable('potlucks', tbl => {
        tbl.increments('id')
            .notNullable();
        tbl.string('title')
            .notNullable();
        tbl.string('description')
            .notNullable();
        tbl.datetime('date')
            .notNullable();

    })
    .createTable('items', tbl => {
        tbl.increments('id')
        .notNullable();
        tbl.integer('potluckID')
        .notNullable();
        tbl.string('items')
            .notNullable();
    })
    
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('potlucks')
                       .dropTableIfExists('items');
  
};
