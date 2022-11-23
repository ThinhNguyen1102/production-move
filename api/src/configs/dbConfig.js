module.exports = {
  USER: process.env.DATABASE_USER_NAME,
  PASSWORD: process.env.DATABSE_USER_PASSWORD,
  DB: process.env.DATABASE_NAME,
  HOST: "172.17.0.2",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
