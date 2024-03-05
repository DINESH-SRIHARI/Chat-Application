const { register, login, setAvat, allusers } = require('../Controllers/userController')

const router=require('express').Router()
router.post('/register',register)
router.post('/login',login)
router.post('/setAvatarr/:id',setAvat)
router.get('/allusers/:id',allusers)
module.exports=router