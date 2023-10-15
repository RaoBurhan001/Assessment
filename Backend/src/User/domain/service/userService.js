const {
  issueJwt,
  comparePassword,
  generatePassowrd,
} = require('../../../libraries/utils/auth');

const userRepository = require('../../data-access/userRepository');
/**
 * register a user against it provided info
 * @param {*} userBody
 * @returns <Promise> user
 */
const createUser = async (userBody) => {
  console.log('🚀 ~ file: userService.js:14 ~ createUser ~ userBody:', userBody)
  try {
    const isEmail = await isEmailTaken({ email: userBody.email });
    if (isEmail.success) {
      throw new Error('Email already exists');
    }
    // if (await checkUserName(userBody.name)) {
    //   throw new Error('UserName is taken');
    // }
    const password = await generatePassowrd(userBody.password);
    console.log('🚀 ~ file: userService.js:24 ~ createUser ~ password:', password)

    userBody.salt = password.salt;
    userBody.password_hash = password.passwordHash;
    delete userBody.password;

    // Save the user to the database
    const userData = await userRepository.createUser(userBody);
    if (userData) {
      return { success: true, data: userData };
    } else {
      throw new Error('Failed to create the record');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Checks if the entered email exist in the db or not
 * @param {email} email
 * @returns <Promise> user.email
 */
const isEmailTaken = async function (email) {
  // try {
  const userEmail = await userRepository.isEmailTaken(email);
  console.log(userEmail);
  if (userEmail) {
    return { success: true, data: userEmail };
  } else {
    return { success: false, error: 'Email is not found' };
  }
};

/**
 * Access the user provided in the token
 * @param {uerBody} userBody
 * @returns <Promise> user
 */
const getUserFromToken = async (userBody) => {
  try {
    const user = userRepository.getUserFromToken(userBody);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const loginUser = async (userBody) => {
  try {
    const user = await userRepository.isUserExists(userBody);
    if (!user) {
      throw new Error('No user Found');
    }
    const passwordMatch = await comparePassword(
      userBody.password,
      user.password_hash
    );
    if (!passwordMatch) throw new Error('Passowrd does not match');

    const token = issueJwt(user);
    return { success: true, data: token };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllUsers = async (search ,page,limit,orderby) => {
  try {
    const users = await userRepository.getAllUsers(search ,page,limit,orderby);
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

const checkUserName = async (userBody) => {
  try {
    const userName = await userRepository.checkUserName(userBody);
    if (userName) {
      return userName;
    }
    return userName;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await userRepository.getUserById(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUserById = async (userId, userBody) => {
  try {
    const user = await userRepository.updateUserById(userId, userBody);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await userRepository.deleteUser(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = {
  createUser,
  isEmailTaken,
  getUserFromToken,
  loginUser,
  getAllUsers,
  checkUserName,
  getUserById,
  updateUserById,
  deleteUser,
};
