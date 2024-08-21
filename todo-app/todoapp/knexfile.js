module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "todo_app",
    },
    pool:{
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "todo_app",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "todo_app",
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};