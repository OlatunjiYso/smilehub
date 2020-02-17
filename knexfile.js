require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DEVELOPMENT_DB_HOST || "localhost",
      database: process.env.DEVELOPMENT_DB,
      user: process.env.DEVELOPMENT_DB_USER,
      password: process.env.DEVELOPMENT_DB_PASSWORD
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
      useNullAsDefault: true
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.STAGING_DB_HOST,
      database: process.env.STAGING_DB,
      user: process.env.STAGING_DB_USER,
      password: process.env.STAGING_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.PRODUCTION_DB_HOST ,
      database: process.env.PRODUCTION_DB,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 1000
    },
    migrations: {
      directory: "./migrations"
    }
  },

  test: {
    client: "pg",
    connection: {
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
