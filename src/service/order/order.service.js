const db = require('./../db/db.service');
const orderValidator = require('./../../validators/order/order.validator');

async function getAll(req) {

    let { page, row } = req.query;
    if (page === undefined || page === "") {
        page = 1;
    }
    if (row === undefined || row === "") {
        row = 5;
    }
    page = ((page - 1) * row);
    const q = `SELECT * FROM orders INNER JOIN products ON orders.product_id = products.product_id ORDER BY orders.order_id ASC LIMIT ${row} OFFSET ${page};`;
    const rows = await db.query(q).then((res) => res.rows);
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
async function create(reqBody) {
    orderValidator.isEmptyData(reqBody);
    const {customer_account_id,product_id,quantity} = reqBody;

    const q1 = {
        text : 'INSERT INTO orders(customer_account_id,product_id,quantity) VALUES ($1,$2,$3)',
        values : [customer_account_id,product_id,quantity]
    };
    await db.query(q1);

    return {
        code : 201,
        message : 'Data berhasil ditambahkan',
    }
}
async function update(reqBody,reqParams) {
    const {order_id} = reqParams;
    const q1 = {
        text : 'SELECT * FROM orders WHERE order_id = ($1)',
        values : [`${order_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan order id ${reqParams.product_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    // Make an SQL Query For Updating Data
    let q2 = 'UPDATE orders SET '
    const condition = `WHERE order_id = ${order_id};`
    let totalPropsInReqBody = 0,count = 0;
    for (let props in reqBody) {
        totalPropsInReqBody++;
    }
    for (let props in reqBody) {
        if (count + 1 !== totalPropsInReqBody) {
            q2 += `${props} = '${reqBody[props]}',`
        } else {
            q2 += `${props} = '${reqBody[props]}' `
        }
        count++;
    }
    q2 += condition;
    // Update data
    await db.query(q2);
    // Get data
    const q3 = {
        text : 'SELECT * FROM orders WHERE order_id = ($1)',
        values : [`${order_id}`]
    }
    const getAddedData = await db.query(q3);
    return {
        code : 200,
        message : 'Data berhasil diupdate',
        data : getAddedData.rows[0]
    }
}
async function getById(reqParams) {
    const {order_id} = reqParams;
    // Get data
    const q1 = {
        text : 'SELECT * FROM orders INNER JOIN products ON  orders.product_id = products.product_id WHERE order_id = ($1) ORDER BY orders.order_id ASC;',
        values : [`${order_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data order dengan Id ${product_id} tidak ditemukan`);
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
    const {order_id} = reqParams;
    const q1 = {
        text : 'SELECT * FROM orders WHERE order_id = ($1)',
        values : [`${order_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data order dengan Id ${order_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    // Remove data
    const q2 = {
        text : 'DELETE FROM orders WHERE order_id = ($1)',
        values : [`${order_id}`]
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