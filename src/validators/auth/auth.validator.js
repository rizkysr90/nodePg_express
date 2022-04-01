function login(input,target) {
    if (input.username === target.username &&
        input.password === target.password) {
        return true;
    } 
    return false;
}

module.exports = {
    login
}