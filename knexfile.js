// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      database: "delicias_neide",
      user: "juniorwmr",
      password: "scylla123",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};
