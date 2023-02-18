const env = require('../utils/enviromen')
const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const PostModel = require('../models/post')

const sequelize = new Sequelize(
    env.getKey('NAME_DATABASE'),
    env.getKey('USER_DATABASE'),
    env.getKey('PASSWORD_DATABASE'),
    {
        host: env.getKey('HOST_DATABASE'),
        dialect: 'mssql'
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })

const UsersModel = UserModel(sequelize, Sequelize)
const PostsModel = PostModel(sequelize, Sequelize)


module.exports={
    UsersModel,
    PostsModel
}