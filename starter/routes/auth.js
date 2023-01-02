const express= require('express')
const route= express.Router()

const {login,register}= require('../controllers/auth')

route.post('./register',register)
route.post ('./login', login )

module.exports= route
