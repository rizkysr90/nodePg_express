const productService = require('./../../service/product/product.service');

async function getAll(req,res,next) {
    try {
        const result = await productService.getAll(req);
        res.status(result.code).json(result);
    } catch(err) {
        next(err);
    }
}
async function create(req,res,next) {
    try {
        const result = await productService.create(req.body);
        res.status(result.code).json(result);
    } catch (err) {
        next(err)
    }
}
async function update(req,res,next) {
    try {
        const result = await productService.update(req.body,req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}
async function remove(req,res,next) {
    try {
        const result = await productService.remove(req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}
async function getById(req,res,next) {
    try {
        const result = await productService.getById(req.params);
        res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAll,
    create,
    update,
    remove,
    getById
}