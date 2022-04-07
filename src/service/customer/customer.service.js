const db = require('./../db/db.service');
const customerValidator = require('./../../validators/customer/customer.validator');

async function getAll(req) {
    let { page, row } = req.query;
    if (page === undefined || page === "") {
        page = 1;
    }
    if (row === undefined || row === "") {
        row = 5;
    }
    console.log(page,row);


    page = ((page - 1) * row);
    const q = `SELECT * FROM customer_accounts ORDER BY customer_account_id ASC LIMIT ${row} OFFSET ${page}`;
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
    // Adding data
    await db.query(q2);
    
    // Get data
    const q3 = {
        text : 'SELECT * FROM customer_accounts WHERE email = ($1)',
        values : [`${reqBody.email}`]
    }
    const getAddedData = await db.query(q3);

    // Create data on profile tables
    const q4 = {
        text : 'INSERT INTO profiles (customer_account_id) VALUES ($1)',
        values : [`${getAddedData.rows[0].customer_account_id}`],
    }
    await db.query(q4);
    return {
        code : 201,
        message : 'Data berhasil ditambahkan',
        data : getAddedData.rows[0]
    }
}
async function update(reqBody,reqParams) {
    customerValidator.validData(reqBody);
    if (reqBody.email !== undefined) {
        const q1 = {
            text : 'SELECT email FROM customer_accounts WHERE email = ($1)',
            values : [`${reqBody.email}`]
        }
        const isEmailUnique = await db.query(q1).then((res) => res.rowCount);
        customerValidator.uniqueEmail(isEmailUnique);

    } 
    // Make an SQL Query For Updating Data
    let q1 = 'UPDATE customer_accounts SET '
    const condition = `WHERE customer_account_id = ${reqParams.customer_id};`
    let totalPropsInReqBody = 0,count = 0;
    for (let props in reqBody) {
        totalPropsInReqBody++;
    }
    for (let props in reqBody) {
        if (count + 1 !== totalPropsInReqBody) {
            q1 += `${props} = '${reqBody[props]}',`
        } else {
            q1 += `${props} = '${reqBody[props]}' `
        }
        count++;
    }
    q1 += condition;
    // Update data
    await db.query(q1);

    // Get data
    const q3 = {
        text : 'SELECT * FROM customer_accounts WHERE customer_account_id = ($1)',
        values : [`${reqParams.customer_id}`]
    }
    const getAddedData = await db.query(q3);
    return {
        code : 200,
        message : 'Data berhasil diupdate',
        data : getAddedData.rows[0]
    }
    

}
async function getById(reqParams) {
    // Get data
    const q1 = {
        text : 'SELECT * FROM customer_accounts WHERE customer_account_id = ($1)',
        values : [`${reqParams.customer_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan Id ${reqParams.customer_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    return {
        code : 200,
        message : 'Sukses mendapatkan data',
        data : getData.rows[0]
    }
}
async function remove(reqParams) {
    const q1 = {
        text : 'SELECT * FROM customer_accounts WHERE customer_account_id = ($1)',
        values : [`${reqParams.customer_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan Id ${reqParams.customer_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    // Remove data
    const q2 = {
        text : 'DELETE FROM customer_accounts WHERE customer_account_id = ($1)',
        values : [`${reqParams.customer_id}`]
    }
    await db.query(q2);
    return {
        code : 200,
        message : 'Data berhasil dihapus',
        data : getData.rows[0]
    }
}
module.exports = {
    getAll,
    create,
    update,
    getById,
    remove
}
