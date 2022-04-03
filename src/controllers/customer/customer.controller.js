const customerService = require('../../service/customer/customer.service');

async function getAll(req,res,next) {
    try {
        const result = await customerService.getAll();
        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
}
async function create(req,res,next) {
    try {
        const result = await customerService.create(req.body);
        res.status(result.code).send(result);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
    create
}