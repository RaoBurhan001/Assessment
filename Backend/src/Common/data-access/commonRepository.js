const { Countries, State, City } = require('../domain/model');

const getAllCountries = async () => {
  try {
    const countries = await Countries.find({});
    return countries;
  } catch (err) {
    return err.message;
  }
};
const getStatesByCountryId = async (id) => {
  try {
    const states = await State.find({ country_id: id });
    return states;
  } catch (err) {
    return err.message;
  }
};

const getCitiesByStateId = async (id) => {
  try {
    const cities = await City.find({ state_id: id });
    return cities;
  } catch (err) {
    return err.message;
  }
};
module.exports = { getAllCountries, getStatesByCountryId, getCitiesByStateId };
