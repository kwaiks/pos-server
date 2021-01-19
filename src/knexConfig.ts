// Update with your config settings.
import { knexSnakeCaseMappers } from "objection";

export default {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/config/db/migrations",
      tableName: "mesan_dev_migrations"
    },
    seeds: {
      directory: __dirname + "/config/db/seeds",
    },
    ...knexSnakeCaseMappers()
  },
  test: {
    client: "pg",
    connection: {
      database: process.env.DB,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/config/db/migrations",
      tableName: "mesan_dev_migrations"
    },
    seeds: {
      directory: __dirname + "/config/db/seeds",
    },
    ...knexSnakeCaseMappers()
  },
  staging: {
    client: "postgresql",
    connection: {
      database: process.env.DB,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/config/db/migrations",
      tableName: "mesan_dev_migrations"
    },
    seeds: {
      directory: __dirname + "/config/db/seeds",
    },
    ...knexSnakeCaseMappers()
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.DB,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/config/db/migrations",
      tableName: "mesan_dev_migrations"
    },
    seeds: {
      directory: __dirname + "/config/db/seeds",
    },
    ...knexSnakeCaseMappers()
  }

};
