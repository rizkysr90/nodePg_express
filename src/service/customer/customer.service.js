const db = require('./../db/db.service');

async function getAll() {
    const q = `SELECT * FROM customer_accounts`;
    const rows = await db.query(q).then((res) => res.rows);
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
module.exports = {
    getAll
}
