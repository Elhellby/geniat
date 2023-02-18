const { UsersModel, PostsModel } = require('../data/db')
const jwt = require("jsonwebtoken");
const customError = require("../handlers/customErrorHandler");
const baseResponse = require("../models/baseResponseModel");
const crypto = require("../utils/crypto");
const { literal } = require('sequelize');

var response = null;
var httpCode = 200;

controller = {
    getAllPost: customError(async (req, res, next) => {
        let userPost = await PostsModel.findAll({
            where: {
                Status: true
            },
            attributes: [
                'Title',
                'Description',
                ['createdAt', 'CreatedAt'],
                [literal("''"), 'UserName'],
                [literal("''"), 'UserRole'],
                'IdUser'
            ]
        });

        const user = await UsersModel.findOne({
            where: {
                id: (userPost[0]).IdUser
            }
        })

        userPost.map(m => {
            m.dataValues.UserName = `${user.Name} ${user.LastName}`
            m.dataValues.UserRole = user.Role
            delete m.dataValues.IdUser
        })
        response = new baseResponse(true, "", userPost);
        res.status(httpCode).json(response);
    }),
    createPost: customError(async (req, res, next) => {
        const userPost = new PostsModel(req.body);
        userPost.Status = true
        const result = await userPost.save()
        response = new baseResponse(true, "Publicacion creada con el id " + result.id, userPost);
        res.status(httpCode).json(response);
    }),
    updatePost: customError(async (req, res, next) => {
        let message = "Publicacion actualizada correctamente"
        const userPost = new PostsModel(req.body);
        const result = await PostsModel.update({
            Title: userPost.Title,
            Description: userPost.Description
        }, {
            where: {
                id: userPost.id
            }
        })
        if (result == 0) {
            message = "Publicacion invalida"
        }
        response = new baseResponse(true, message, result);
        res.status(httpCode).json(response);
    }),
    deletePost: customError(async (req, res, next) => {
        const idPost = req.params.id
        const result = await PostsModel.update({
            Status: false
        }, {
            where: {
                id: idPost
            }
        })
        console.log(result)
        response = new baseResponse(true, "Publicacion eliminada correctamente");
        res.status(httpCode).json(response);
    })
};

module.exports = controller;