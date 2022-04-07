const db = require('./../db/db.service');

async function getAll(req) {
    let { page, row } = req.query;
    if (page === undefined || page === "") {
        page = 1;
    }
    if (row === undefined || row === "") {
        row = 5;
    }


    page = ((page - 1) * row);

    const q = `SELECT * FROM profiles INNER JOIN customer_accounts ON profiles.customer_account_id = customer_accounts.customer_account_id  ORDER BY profiles.customer_account_id ASC LIMIT ${row} OFFSET ${page}`;
    const rows = await db.query(q).then((res) => res.rows);
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
async function update(reqParams,reqBody) {
    // Make an SQL Query For Updating Data
    const checkIsAny = {
        text : 'SELECT * FROM profiles WHERE customer_account_id = ($1)',
        values : [`${reqParams.customer_account_id}`]
    };
    const getData = await db.query(checkIsAny);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan Id Customer ${reqParams.customer_account_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }

    let q1 = 'UPDATE profiles SET '
    const condition = `WHERE customer_account_id = ${reqParams.customer_account_id};`
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
    const q2 = {
        text : 'SELECT * FROM profiles WHERE customer_account_id = ($1)',
        values : [`${reqParams.customer_account_id}`]
    }
    const getAddedData = await db.query(q2);
    return {
        code : 200,
        message : 'Data berhasil diupdate',
        data : getAddedData.rows[0]
    }
}
async function getById(reqParams) {
    const {customer_account_id} = reqParams;
    // Get data
    const q1 = {
        text : 'SELECT * FROM profiles WHERE customer_account_id = ($1)',
        values : [`${customer_account_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan id customer ${customer_account_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    return {
        code : 200,
        message : 'Sukses mendapatkan data',
        data : getData.rows[0]
    }
}
module.exports = {
    getAll,
    update,
    getById
}