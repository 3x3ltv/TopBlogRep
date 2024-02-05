// create_posts_table.js
exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users');
        // Добавьте другие поля поста, если необходимо

        // Добавляем метку времени для создания и обновления записи
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
