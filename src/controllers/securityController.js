const { UsersModel } = require('../data/db')
const jwt = require("jsonwebtoken");
const customError = require("../handlers/customErrorHandler");
const baseResponse = require("../models/baseResponseModel");
const crypto = require("../utils/crypto")
const env = require('../utils/enviromen')

var response = null;
var httpCode = 200;

controller = {
    login: customError(async (req, res, next) => {
        const user = new UsersModel(req.body);

        console.log(user.Email)
        console.log(user.Password)

        const existUser = await UsersModel.findOne({
            where: {
                Email: user.Email
            }
        });
        if (existUser) {
            const validPass = user.Password == crypto.decrypt(existUser.Password);
            if (validPass) {
                existUser.Password = ''
                const token = jwt.sign({ existUser }, env.getKey('KEY'));
                response = new baseResponse(true, "Acceso concedido.", {
                    token: token,
                    userId: existUser.id
                });
            } else {
                httpCode = 401
                response = new baseResponse(false, "Contraseña incorrecta.");
            }
        } else {
            httpCode = 404
            response = new baseResponse(false, `El usuario ${user.email} no existe.`);
        }
        res.status(httpCode).json(response);
    })
};

module.exports = controller;