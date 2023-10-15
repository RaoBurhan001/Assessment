const userService = require('../service/userService');
const httpStatus = require('http-status');
require('dotenv').config();
const globalResponse = require('../../../libraries/utils/globalResponse');

const signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return globalResponse(
      res,
      user.data,
      'success',
      'User is created',
      httpStatus.OK
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    return globalResponse(
      res,
      user.data,
      'success',
      'User is Created',
      httpStatus.OK
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { search, page, limit, orderby } = req.query;
    const user = await userService.getAllUsers(search ,page,limit,orderby);
    globalResponse(res, user, 'success', 'Get Users', httpStatus.OK);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUserbyId = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId);
      globalResponse(res, user, 'success', 'Get User ', httpStatus.OK);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.updateUserById(userId, req.body);
    globalResponse(res, user, 'success', 'User Profile Updated', httpStatus.OK);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.deleteUser(userId);
      globalResponse(res, null, 'success', 'User Deleted', httpStatus.OK);
    } catch (error) {
      next(error);
    }
  }
module.exports = {
  loginUser,
  signup,
  getAllUsers,
  getUserbyId,
  updateUserById,
  deleteUser,
};
