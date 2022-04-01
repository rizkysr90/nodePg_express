const customerService = require('../../service/customer/customer.service');

async function getAll(req,res,next) {
    try {
        const result = await customerService.getAll();
        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getAll
}