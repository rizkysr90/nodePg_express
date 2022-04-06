function isEmptyData(reqBody) {
    for (props in reqBody) {
        if (reqBody[props] === "") {
            let err = new Error('Data tidak boleh kosong');
            err.statusCode = 400;
            throw err;
        }
    }
    return true;
}


module.exports = {
    isEmptyData
}