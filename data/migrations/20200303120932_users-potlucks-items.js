
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('username')
          .notNullable();
        tbl.string('password', 128)
            .notNullable();
    })
    .createTable('potlucks', tbl => {
        tbl.increments('id')
            .notNullable();
        tbl.string('title')
            .notNullable();
        tbl.string('description')
            .notNullable();
        tbl.datetime('date')
            .notNullable();
        tbl.integer('userID')

    })
    .createTable('items', tbl => {
        tbl.increments('id')
        .notNullable();
        tbl.integer('potluckID')
        .notNullable();
        tbl.string('items')
            .notNullable();
        tbl.string('guest')
    })
    .createTable('guests', tbl => {
        tbl.increments('id')
        .notNullable();
        tbl.integer('potluckID')
        tbl.string('guest_name')
    })
    
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('guests')
                        .dropTableIfExists('items')
                        .dropTableIfExists('potlucks')
                       .dropTableIfExists('users');
  
};