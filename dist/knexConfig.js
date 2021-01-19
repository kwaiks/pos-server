// Update with your config settings.
module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'mesan',
            user: 'postgres',
            password: 'alex02'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'mesan_dev_migrations'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'mesan'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
//# sourceMappingURL=knexConfig.js.map