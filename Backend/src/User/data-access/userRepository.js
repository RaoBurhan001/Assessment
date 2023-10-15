const User = require('../domain/model/User');

const createUser = async (userBody) => {
  console.log(
    '🚀 ~ file: userRepository.js:4 ~ createUser ~ userBody:',
    userBody
  );
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

const isEmailTaken = async (email) => {
  try {
    console.log(email);
    const userEmail = await User.findOne(email, { email: 1 });
    console.log(userEmail);
    return userEmail;
  } catch (err) {
    return err;
  }
};

const getUserFromToken = async (userBody) => {
  try {
    const user = await User.findById(userBody.id);
    return user;
  } catch (err) {
    return err;
  }
};

const isUserExists = async (userBody) => {
  try {
    const user = await User.findOne({ email: userBody.email });
    return user;
  } catch (err) {
    return err;
  }
};

const getAllUsers = async (search, page, limit, orderby) => {
  try {
    let filterCriteria = {};
    if (search !== 'undefined') {
      filterCriteria = {
        name: new RegExp(search, 'i'), // Case-insensitive search
      };

      const totalItems = await User.countDocuments(filterCriteria);

      const items = await User.find(filterCriteria)
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

const checkUserName = async (userBody) => {
  try {
    const user = await User.findOne({ username: userBody }, { username: 1 });
    return user;
  } catch (err) {
    return err;
  }
};

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
