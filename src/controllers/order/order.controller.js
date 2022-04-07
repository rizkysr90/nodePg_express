const orderService = require('./../../service/order/order.service');

async function getAll(req,res,next) {
    try {
        const result = await orderService.getAll(req);
        res.status(result.code).json(result);
    } catch(err) {
        next(err);
    }
}
async function create(req,res,next) {
    try {
        const result = await orderService.create(req.body);
        res.status(result.code).json(result);
    } catch(err) {
        next(err);
    }
}
async function update(req,res,next) {
    try {
        const result = await orderService.update(req.body,req.params);
        res.status(result.code).json(result);
    } catch(err) {
        next(err);
    }
}
async function getById(req,res,next) {
    try {
        const result = await orderService.getById(req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}
async function remove(req,res,next) {
    try {
        const result = await orderService.remove(req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    create,
    update,
    getById,
    remove
}