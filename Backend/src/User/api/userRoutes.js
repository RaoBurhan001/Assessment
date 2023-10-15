const express = require('express')
const router = express.Router()
const userController = require('../domain/controller/userController')
const { authenticateJWT } = require('../../libraries/middlewares/auth')

router.post('/signup', userController.signup)
router.post('/login', userController.loginUser)
router.get('/', authenticateJWT, userController.getAllUsers)
router.get('/:userId', authenticateJWT, userController.getUserbyId)
router.put('/update/:userId', authenticateJWT, userController.updateUserById)
router.delete('/delete/:userId', authenticateJWT, userController.deleteUser)

module.exports = router;