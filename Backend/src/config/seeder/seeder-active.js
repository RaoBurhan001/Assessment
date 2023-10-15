const connectDb = require('./../dbConfig');
const { Country, State, City } = require('../../Common/domain/model');
const cities = require('../../libraries/constants/Cities');
const countriesList = require('../../libraries/constants/Countries');
const statesData = require('../../libraries/constants/States');
const mongoose = require('mongoose');

const populateDatabase = async () => {
  // Connect to the database
  await connectDb();

  try {
    // delete all the exisitng data
    await Country.deleteMany({});
    await State.deleteMany({});
    await City.deleteMany({});
    // Insert countries
    const countries = await Country.insertMany(countriesList);

    // Map country names to statesData
    const statesDataWithCountryId = statesData.map((state) => ({
      ...state,
      country_id: countries.find((c) => c.name === state.countryName)._id,
    }));

    // Insert states
    const states = await State.insertMany(statesDataWithCountryId);

    // Map state names to citiesData
    const citiesDataWithStateId = cities.map((city) => ({
      ...city,
      state_id: states.find((s) => s.name === city.stateName)._id,
    }));

    // Insert cities
    await City.insertMany(citiesDataWithStateId);

    console.log('Sample data inserted successfully');
  } catch (err) {
    console.error(err);
  } finally {
    // Disconnect from the database
    mongoose.connection.close();
  }
};

populateDatabase();
