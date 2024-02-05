module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 6432,
    user: 'topblog',
    password: 'topblog',
    database: 'topblog',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};
