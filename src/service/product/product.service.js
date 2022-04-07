const db = require('./../db/db.service');
const productValidator = require('./../../validators/product/product.validator');

async function getAll(req) {
    let { page, row } = req.query;
    if (page === undefined || page === "") {
        page = 1;
    }
    if (row === undefined || row === "") {
        row = 5;
    }
    page = ((page - 1) * row);
    
    const q = `SELECT * FROM products ORDER BY product_id ASC LIMIT ${row} OFFSET ${page}`;
    const rows = await db.query(q).then((res) => res.rows);
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
async function create(reqBody) {
    productValidator.isEmptyData(reqBody);
    const {name,price,stock} = reqBody;

    const q1 = {
        text : 'INSERT INTO products (name,price,stock) VALUES ($1, $2, $3)',
        values : [`${name}`,`${price}`,`${stock}`],
    }
    const added = await db.query(q1);
    return {
        code : 201,
        message : 'Data berhasil ditambahkan',
    }
}
async function update(reqBody,reqParams) {
    const q1 = {
        text : 'SELECT * FROM products WHERE product_id = ($1)',
        values : [`${reqParams.product_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan Id ${reqParams.product_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    // Make an SQL Query For Updating Data
    let q2 = 'UPDATE products SET '
    const condition = `WHERE product_id = ${reqParams.product_id};`
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
        text : 'SELECT * FROM products WHERE product_id = ($1)',
        values : [`${reqParams.product_id}`]
    }
    const getAddedData = await db.query(q3);
    return {
        code : 200,
        message : 'Data berhasil diupdate',
        data : getAddedData.rows[0]
    }
}
async function remove(reqParams) {
    const q1 = {
        text : 'SELECT * FROM products WHERE product_id = ($1)',
        values : [`${reqParams.product_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data dengan Id ${reqParams.product_id} tidak ditemukan`);
        err.statusCode = 404;
        throw err;
    }
    // Remove data
    const q2 = {
        text : 'DELETE FROM products WHERE product_id = ($1)',
        values : [`${reqParams.product_id}`]
    }
    await db.query(q2);
    return {
        code : 200,
        message : 'Data berhasil dihapus',
        data : getData.rows[0]
    }
}
async function getById(reqParams) {
    const {product_id} = reqParams;
    // Get data
    const q1 = {
        text : 'SELECT * FROM products WHERE product_id = ($1)',
        values : [`${product_id}`]
    }
    const getData = await db.query(q1);
    if (getData.rowCount === 0) {
        let err = new Error(`Data Produk dengan Id ${product_id} tidak ditemukan`);
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
    create,
    update,
    remove,
    getById
}