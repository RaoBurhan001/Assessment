const commonRepository = require('../../data-access/commonRepository')

const getAllCountries = async () => {
  try {
    const countries = await commonRepository.getAllCountries()
    return countries
  } catch (err) {
    throw new Error(err.message)
  }
}

const getStatesByCountryId = async (countryId) => {
    try {
      const states = await commonRepository.getStatesByCountryId(countryId)
      return states
    } catch (err) {
      throw new Error(err.message)
    }
  }
  const getCitiesByStateId = async (stateId) => {
    try {
      const cities = await commonRepository.getCitiesByStateId(stateId)
      return cities
    } catch (err) {
      throw new Error(err.message)
    }
  }
module.exports = { getAllCountries ,getStatesByCountryId, getCitiesByStateId} 
