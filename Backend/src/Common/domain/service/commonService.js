const commonRepository = require('../../data-access/commonRepository');

/**
 * Retrieve a list of all countries.
 * @returns {Promise} List of countries.
 */
const getAllCountries = async () => {
  try {
    const countries = await commonRepository.getAllCountries();
    return countries;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Retrieve a list of states within a specific country by its ID.
 * @param {string} countryId - ID of the country.
 * @returns {Promise} List of states.
 */
const getStatesByCountryId = async (countryId) => {
  try {
    const states = await commonRepository.getStatesByCountryId(countryId);
    return states;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Retrieve a list of cities within a specific state by its ID.
 * @param {string} stateId - ID of the state.
 * @returns {Promise} List of cities.
 */
const getCitiesByStateId = async (stateId) => {
  try {
    const cities = await commonRepository.getCitiesByStateId(stateId);
    return cities;
  } catch (err) {
    throw new Error(err.message);
  }
};


module.exports = {
  getAllCountries,
  getStatesByCountryId,
  getCitiesByStateId,
};
