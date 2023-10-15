const userRoutes = require('./User/api/userRoutes');
const commonRoutes = require('./Common/api/commonRoutes');
const express = require('express')
const router = express.Router()

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes
  },
  {
    path: '/common',
    route: commonRoutes
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

module.exports = router
