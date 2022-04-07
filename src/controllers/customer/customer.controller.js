const customerService = require('../../service/customer/customer.service');

async function getAll(req,res,next) {
    try {
        const result = await customerService.getAll(req);
        res.status(result.code).send(result);
    } catch(err) {
        next(err);
    }
}
async function create(req,res,next) {
    try {
        const result = await customerService.create(req.body);
        res.status(result.code).json(result);
    } catch (err) {
        next(err)
    }
}
async function update(req,res,next) {
    try {
        const result = await customerService.update(req.body,req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}
async function getById(req,res,next) {
    try {
        const result = await customerService.getById(req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}
async function remove(req,res,next) {
    try {
        const result = await customerService.remove(req.params);
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