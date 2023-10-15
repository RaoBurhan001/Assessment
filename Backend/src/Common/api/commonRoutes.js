const express = require('express')
const router = express.Router()
const commonController = require('../domain/controller/commonController')

router.get('/getAllCountries', commonController.getAllCountries)
router.get('/states/:countryId', commonController.getStatesByCountryId)
router.get('/cities/:stateId', commonController.getCitiesByStateId)

module.exports = router
