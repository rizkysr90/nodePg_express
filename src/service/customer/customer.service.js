const db = require('./../db/db.service');
const customerValidator = require('./../../validators/customer/customer.validator');

async function getAll() {
    const q = `SELECT * FROM customer_accounts`;
    const rows = await db.query(q).then((res) => res.rows);
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
async function create(reqBody) {
    customerValidator.validData(reqBody);
    const q1 = {
        text : 'SELECT email FROM customer_accounts WHERE email = ($1)',
        values : [`${reqBody.email}`]
    }
    const isEmailUnique = await db.query(q1).then((res) => res.rowCount);
    customerValidator.uniqueEmail(isEmailUnique);

    const q2 = {
        text : 'INSERT INTO customer_accounts (email,password) VALUES ($1, $2)',
        values : [`${reqBody.email}`,`${reqBody.password}`],
    }
    // Updating data
    await db.query(q2);
    
    // Get data
    const q3 = {
        text : 'SELECT * FROM customer_accounts WHERE email = ($1)',
        values : [`${reqBody.email}`]
    }
    const getAddedData = await db.query(q3);
    return {
        code : 201,
        message : 'Data berhasil ditambahkan',
        data : getAddedData.rows[0]
    }
}
module.exports = {
    getAll,
    create
}
