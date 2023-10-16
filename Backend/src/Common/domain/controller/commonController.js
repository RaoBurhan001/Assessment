const golbalResponse = require('../../../libraries/utils/globalResponse');
const httpStatus = require('http-status');
const commonService = require('../service/commonService');

/**
 * Retrieve a list of all countries.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
const getAllCountries = async (req, res) => {
  try {
    const countries = await commonService.getAllCountries();
    golbalResponse(
      res,
      countries,
      'success',
      'Get All Countries',
      httpStatus.OK
    );
  } catch (err) {
    return err.message;
  }
};

/**
 * Retrieve a list of states within a specific country by its ID.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
const getStatesByCountryId = async (req, res) => {
  try {
    const { countryId } = req.params;
    const states = await commonService.getStatesByCountryId(countryId);
    golbalResponse(res, states, 'success', 'Get All States', httpStatus.OK);
  } catch (err) {
    return err.message;
  }
};

/**
 * Retrieve a list of cities within a specific state by its ID.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
const getCitiesByStateId = async (req, res) => {
  try {
    const { stateId } = req.params;
    const states = await commonService.getCitiesByStateId(stateId);
    golbalResponse(res, states, 'success', 'Get All Cities', httpStatus.OK);
  } catch (err) {
    return err.message;
  }
};


module.exports = { getAllCountries, getStatesByCountryId, getCitiesByStateId  };
