const db = require('./../db/db.service');
const orderValidator = require('./../../validators/order/order.validator');

async function getAll() {
    const q = `SELECT * FROM orders INNER JOIN customer_accounts ON orders.customer_account_id = customer_accounts.customer_account_id ORDER BY orders.customer_account_id ASC`;
    const rows = await db.query(q).then((res) => res.rows);
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
async function create(reqBody) {
    orderValidator.isEmptyData(reqBody);
    
    
    return {
        code : 200,
        message : 'OK - Request has succeeded',
        data : rows
    }
}
module.exports = {
    getAll,
    create
}