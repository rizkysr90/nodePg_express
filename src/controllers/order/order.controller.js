const orderService = require('./../../service/order/order.service');

async function getAll(req,res,next) {
    try {
        const result = await orderService.getAll();
        res.status(result.code).send(result);
    } catch(err) {
        next(err);
    }
}
async function create(req,res,next) {
    try {
        const result = await orderService.create(req.body);
        res.status(result.code).send(result);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getAll,
    create
}