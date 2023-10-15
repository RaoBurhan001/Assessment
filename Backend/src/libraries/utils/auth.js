const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
require('dotenv').config()

const issueJwt = (user) => {
  const id = user._id
  const expiresIn = '1d'
  const payload = {
    id,
    iat: Date.now()
  }
  try {
    const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn
    })
    return {
      token: signedToken,
      expires: expiresIn
    }
  } catch (err) {
    return err
  }
}

const comparePassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword)
}

const generatePassowrd = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  return {
    salt,
    passwordHash
  }
}

const generateCode = () => {
  const code = Math.floor(1000 + crypto.randomInt(90000))
  return code
}

module.exports = {
  issueJwt,
  generatePassowrd,
  comparePassword,
  generateCode
}
