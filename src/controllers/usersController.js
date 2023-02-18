const { UsersModel } = require('../data/db')
const jwt = require("jsonwebtoken");
const customError = require("../handlers/customErrorHandler");
const baseResponse = require("../models/baseResponseModel");
const crypto = require("../utils/crypto")

var response = null;
var httpCode = 200;

controller = {
    register: customError(async (req, res, next) => {
        let user = new UsersModel(req.body);

        console.log(user.Email)
        console.log(user.Password)

        const existUser = await UsersModel.findOne({
            where: {
                Email: user.Email
            }
        })
        if (!existUser) {
            user.Password = crypto.encrypt(user.Password);
            await user.save()
            response = new baseResponse(true, "Usuario registrado.");
        } else {
            httpCode = 403
            response = new baseResponse(false, "El Usuario ya existe.");
        }
        res.status(httpCode).json(response);
    })
};

module.exports = controller;