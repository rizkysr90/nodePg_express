const express = require('express');
const router = express.Router();
const profileService = require('./../../service/profile/profile.service');
async function getAll(req,res,next) {
    try {
        const result = await profileService.getAll(req);
        res.status(result.code).json(result);
    } catch(err){
        next(err);
    }
}
async function update(req,res,next) {
    try {
        const result = await profileService.update(req.params,req.body);
        res.status(result.code).json(result);
    } catch(err) {
        next(err);
    }
}
async function getById(req,res,next) {
    try {
        const result = await profileService.getById(req.params);
        res.status(result.code).json(result);
    } catch(err) {
        next(err);
    }
}
module.exports = {
    getAll,
    update,
    getById
}
// Finish