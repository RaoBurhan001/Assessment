const userService = require('../service/userService');
const httpStatus = require('http-status');
require('dotenv').config();
const globalResponse = require('../../../libraries/utils/globalResponse');

/**
 * Sign up a new user.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} Express response with user data or error message.
 */
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

/**
 * Log in a user.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} Express response with user data or error message.
 */
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

/**
 * Get all users based on query parameters.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} Express response with user data or error message.
 */
const getAllUsers = async (req, res) => {
  try {
    const { search, page, limit, orderby } = req.query;
    const user = await userService.getAllUsers(search, page, limit, orderby);
    globalResponse(res, user, 'success', 'Get Users', httpStatus.OK);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Get a user by their ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} Express response with user data or error message.
 */
const getUserbyId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    globalResponse(res, user, 'success', 'Get User', httpStatus.OK);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Update a user's information by their ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} Express response with updated user data or error message.
 */
const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.updateUserById(userId, req.body);
    globalResponse(res, user, 'success', 'User Profile Updated', httpStatus.OK);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a user by their ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Response} Express response with success message or error message.
 */
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.deleteUser(userId);
    globalResponse(res, null, 'success', 'User Deleted', httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  signup,
  getAllUsers,
  getUserbyId,
  updateUserById,
  deleteUser,
};
