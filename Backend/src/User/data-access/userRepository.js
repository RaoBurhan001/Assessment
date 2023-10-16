const User = require('../domain/model/User');

/**
 * Create a new user with the provided user data.
 *
 * @param {object} userBody - User data.
 * @returns {Promise<object>} The user data.
 */
const createUser = async (userBody) => {
  try {
    const newUser = new User({
      name: userBody.name,
      email: userBody.email,
      password_hash: userBody.password_hash,
      salt: userBody.salt,
    });
    const userData = await newUser.save();
    return userData;
  } catch (err) {
    return err.message;
  }
};

/**
 * Check if an email is already taken by an existing user.
 *
 * @param {string} email - The email to check.
 * @returns {Promise<object|null>} The user email or null if not found.
 */
const isEmailTaken = async (email) => {
  try {
    const userEmail = await User.findOne(email, { email: 1 });
    return userEmail;
  } catch (err) {
    return err;
  }
};

/**
 * Get a user from a token.
 *
 * @param {object} userBody - User data.
 * @returns {Promise<object|null>} The user or null if not found.
 */
const getUserFromToken = async (userBody) => {
  try {
    const user = await User.findById(userBody.id);
    return user;
  } catch (err) {
    return err;
  }
};

/**
 * Check if a user with a given email already exists.
 *
 * @param {object} userBody - User data with an email.
 * @returns {Promise<object|null>} The user or null if not found.
 */
const isUserExists = async (userBody) => {
  try {
    const user = await User.findOne({ email: userBody.email });
    return user;
  } catch (err) {
    return err;
  }
};

/**
 * Get a list of users based on search criteria, pagination, and sorting.
 *
 * @param {string} search - Search term.
 * @param {number} page - Page number.
 * @param {number} limit - Number of items per page.
 * @param {string} orderby - Sorting order.
 * @returns {Promise<object>} User data.
 */
const getAllUsers = async (search, page, limit, orderby) => {
  try {
    let filterCriteria = {};
    if (search !== 'undefined') {
      filterCriteria = {
        name: new RegExp(search, 'i'), // Case-insensitive search
      };

      const totalItems = await User.countDocuments(filterCriteria);

      const items = await User.find(filterCriteria)
        .populate('country_id')
        .populate('state_id')
        .populate('city_id')
        .sort(orderby === 'asc' ? 'name' : '-name')
        .skip((page - 1) * limit)
        .limit(limit);

      const data = {
        items,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        totalItems,
      };

      return data;
    } else {
      // Handle the case when the search term is not provided
      const totalItems = await User.countDocuments();
      const items = await User.find({})
        .populate('country_id')
        .populate('state_id')
        .populate('city_id')
        .sort(orderby === 'asc' ? 'name' : '-name')
        .skip((page - 1) * limit)
        .limit(limit);

      const data = {
        items,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        totalItems,
      };

      return data;
    }
  } catch (err) {
    return err;
  }
};

/**
 * Check if a username is already taken.
 *
 * @param {object} userBody - User data with a username.
 * @returns {Promise<object|null>} The user username or null if not found.
 */
const checkUserName = async (userBody) => {
  try {
    const user = await User.findOne({ username: userBody }, { username: 1 });
    return user;
  } catch (err) {
    return err;
  }
};

/**
 * Get a user by their ID.
 *
 * @param {string} userId - User ID.
 * @returns {Promise<object|null>} The user or null if not found.
 */
const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
      .populate({ path: 'country_id' })
      .populate({ path: 'state_id' })
      .populate({ path: 'city_id' });
    return user;
  } catch (err) {
    return err;
  }
};

/**
 * Update user information by their ID.
 *
 * @param {string} userId - User ID.
 * @param {object} userBody - Updated user data.
 * @returns {Promise<object|null>} The updated user or null if not found.
 */
const updateUserById = async (userId, userBody) => {
  try {
    const updatedPlayer = await User.findByIdAndUpdate(userId, userBody, {
      new: true,
    });
    return updatedPlayer;
  } catch (err) {
    return err;
  }
};

/**
 * Delete a user by their ID.
 *
 * @param {string} id - User ID.
 * @returns {Promise<object|null>} The deleted user or null if not found.
 */
const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser,
  isEmailTaken,
  getUserFromToken,
  isUserExists,
  getAllUsers,
  checkUserName,
  getUserById,
  updateUserById,
  deleteUser,
};
