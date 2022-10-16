const Pool = require('pg').Pool;

const pool = new Pool({
    user:'ajtwmuhk',
    password:'3hORdwAVdn3sby395O-NnnFnaCo1MqSi',
    host:'jelani.db.elephantsql.com',
    port:5432,
    database:'ajtwmuhk'
});

module.exports = pool;