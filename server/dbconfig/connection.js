export const config = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    connectTimeout : process.env.CONNECTTIMEOUT
};
