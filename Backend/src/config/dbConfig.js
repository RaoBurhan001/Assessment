const mongoose = require('mongoose')
require('dotenv').config()

async function connectToMongoDB () {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
}

module.exports = connectToMongoDB
