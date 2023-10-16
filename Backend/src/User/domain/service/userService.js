const {
  issueJwt,
  comparePassword,
  generatePassowrd,
} = require('../../../libraries/utils/auth');

const userRepository = require('../../data-access/userRepository');

/**
 * Registers a new user with the provided information.
 * @param {object} userBody - User data including name, email, and password.
 * @returns {Promise} A user object.
 */
const createUser = async (userBody) => {
  try {
    // Check if the email is already taken
    const isEmail = await isEmailTaken({ email: userBody.email });
    if (isEmail.success) {
      throw new Error('Email already exists');
    }

    // Check if the username is taken
    if (await checkUserName(userBody.name)) {
      throw new Error('Username is taken');
    }

    // Generate password hash and salt
    const password = await generatePassowrd(userBody.password);

    // Prepare user data for saving
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
 * Checks if the entered email exists in the database.
 * @param {string} email - Email address to check.
 * @returns {Promise} An object indicating whether the email is taken.
 */
const isEmailTaken = async function (email) {
  const userEmail = await userRepository.isEmailTaken(email);
  if (userEmail) {
    return { success: true, data: userEmail };
  } else {
    return { success: false, error: 'Email is not found' };
  }
};

/**
 * Retrieves a user based on the provided token data.
 * @param {object} userBody - Token data for the user.
 * @returns {Promise} A user object.
 */
const getUserFromToken = async (userBody) => {
  try {
    const user = userRepository.getUserFromToken(userBody);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Logs in a user with the provided credentials.
 * @param {object} userBody - User credentials including email and password.
 * @returns {Promise} An object with a success status and a token if successful.
 */
const loginUser = async (userBody) => {
  try {
    // Check if the user exists
    const user = await userRepository.isUserExists(userBody);
    if (!user) {
      throw new Error('No user found');
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await comparePassword(
      userBody.password,
      user.password_hash
    );

    if (!passwordMatch) throw new Error('Password does not match');

    // Issue a JWT token
    const token = issueJwt(user);

    return { success: true, data: token };
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Retrieves a list of users based on search parameters.
 * @param {string} search - Search criteria.
 * @param {number} page - Page number.
 * @param {number} limit - Limit per page.
 * @param {string} orderby - Sort order.
 * @returns {Promise} A list of user objects.
 */
const getAllUsers = async (search, page, limit, orderby) => {
  try {
    const users = await userRepository.getAllUsers(search, page, limit, orderby);
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Checks if the provided username is already taken.
 * @param {object} userBody - User data including name (username).
 * @returns {Promise} A username object.
 */
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

/**
 * Retrieves a user by their ID.
 * @param {string} userId - User ID.
 * @returns {Promise} A user object.
 */
const getUserById = async (userId) => {
  try {
    const user = await userRepository.getUserById(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Updates a user's information by their ID.
 * @param {string} userId - User ID.
 * @param {object} userBody - Updated user data.
 * @returns {Promise} An updated user object.
 */
const updateUserById = async (userId, userBody) => {
  try {
    const user = await userRepository.updateUserById(userId, userBody);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Deletes a user by their ID.
 * @param {string} userId - User ID to delete.
 * @returns {Promise} A success message.
 */
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
