const { Country, State, City } = require('../domain/model');

/**
 * Retrieves a list of all countries.
 * @returns {Promise} An array of country objects.
 */
const getAllCountries = async () => {
  try {
    const countries = await Country.find({});
    return countries;
  } catch (err) {
    return err.message;
  }
};

/**
 * Retrieves a list of states within a specific country by its ID.
 * @param {string} id - The ID of the country.
 * @returns {Promise} An array of state objects.
 */
const getStatesByCountryId = async (id) => {
  try {
    const states = await State.find({ country_id: id });
    return states;
  } catch (err) {
    return err.message;
  }
};

/**
 * Retrieves a list of cities within a specific state by its ID.
 * @param {string} id - The ID of the state.
 * @returns {Promise} An array of city objects.
 */
const getCitiesByStateId = async (id) => {
  try {
    const cities = await City.find({ state_id: id });
    return cities;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getAllCountries,
  getStatesByCountryId,
  getCitiesByStateId,
};
