const golbalResponse = require('../../../libraries/utils/globalResponse');
const httpStatus = require('http-status');
const commonService = require('../service/commonService');
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

const getStatesByCountryId = async (req, res) => {
  try {
    const { countryId } = req.params;
    const states = await commonService.getStatesByCountryId(countryId);
    golbalResponse(res, states, 'success', 'Get All States', httpStatus.OK);
  } catch (err) {
    return err.message;
  }
};

const getCitiesByStateId = async (req, res) => {
  try {
    const { stateId } = req.params;
    const states = await commonService.getCitiesByStateId(stateId);
    golbalResponse(res, states, 'success', 'Get All Cities', httpStatus.OK);
  } catch (err) {
    return err.message;
  }
};

module.exports = { getAllCountries, getStatesByCountryId, getCitiesByStateId };
