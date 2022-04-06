function validData({email,password}) {
    isEmptyData(email,password);
    isValidEmail(email);
}
function isEmptyData(email,password) {
    if (email === "" || password === "") {
        let err = new Error('Data tidak boleh kosong');
        err.statusCode = 400;
        throw err;
    }
    return true;
}
function isValidEmail(email) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!pattern.test(email)) {
        let err = new Error('Email belum sesuai persyaratan');
        err.statusCode = 400;
        throw err;
    }
    return true;
}
function uniqueEmail(rowCount) {
    if (rowCount > 0) {
        let err = new Error('Email sudah terdaftar di dalam sistem');
        err.statusCode = 400;
        throw err;
    }
}
module.exports = {
    validData,
    uniqueEmail
}