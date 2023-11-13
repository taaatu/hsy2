'use strict';
const { httpError } = require('../utils/errors');
const { validationResult } = require('express-validator');
const {
  getAllUsers,
  insertUser,
  getUserById,
  deleteUser,
  updateUserInfo,
  updateUserInfoByAdmin,
} = require('../models/userModel');

const user_list_get = async (req, res) => {
  const users = await getAllUsers();
  users.map((user) => {
    delete user.password;
  });
  res.json(users);
};

const user_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  const allUsers = await getAllUsers();
  var saveUser = true;
  allUsers.forEach((user) => {
    if (user.email == req.body.email) {
      saveUser = false;
    }
  });
  if (saveUser) {
    const uid = await insertUser(req.body);
    res.json({ message: `user added with id: ${uid}`, id: uid });
  } else {
    res.status(409).json({ message: 'This user email already exist' });
  }
};

const user_get_by_id = async (req, res, next) => {
  const user = await getUserById(req.params.userId);
  if (!user) {
    const err = httpError(`Users not found by id ${req.params.userId}`, 404);
    next(err);
    return;
  }
  res.json(user);
};

const user_delete = async (req, res) => {
  const allUsers = await getAllUsers();
  var deleteStatus = false;
  allUsers.forEach((user) => {
    if (user.user_id == req.params.userId) {
      deleteStatus = true;
    }
  });
  if (deleteStatus) {
    await deleteUser(req.params.userId);
    res.json({ message: `User deleted: ${req.params.userId}` });
  } else {
    res.json({ message: 'This user id does not exist' });
  }
};

const user_info_update_put = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  const allUsers = await getAllUsers();
  const userById = await getUserById(req.user.user_id);
  var saveUser = true;
  allUsers.forEach((user) => {
    if (userById.email != req.body.email && user.email == req.body.email) {
      saveUser = false;
    }
  });
  if (saveUser) {
    await updateUserInfo(req.body, req.user.user_id);
    res.json({ message: `User ${userById.full_name}'s info updated` });
  } else {
    res.status(409).json({ message: 'This user email already exist' });
  }
};

const checkToken = (req, res, next) => {
  const user = req.user;
  if (!user) {
    const err = httpError('Token missing or invalid', 401);
    next(err);
    return;
  }
  res.json(user);
};

const user_info_update_by_admin_put = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('user_info_update_by_admin_put validation', errors.array());
      const err = httpError('data not valid', 400);
      next(err);
      return;
    }
    const allUsers = await getAllUsers();
    var saveUser = true;
    allUsers.forEach((user) => {
      if (req.params.userId != req.body.email && user.email == req.body.email && req.user.user_group == 0) {
        saveUser = false;
      }
    });
    console.log(req.body);
    if (saveUser) {
      await updateUserInfoByAdmin(req.body, req.params.userId);
      res.json({ message: `User ${req.body.full_name}'s info updated` });
    } else {
      res.status(409).json({ message: 'This user email already exist' });
    }
  } catch (error) {
    next(error);
  } 
};
  
module.exports = {
  user_list_get,
  user_post,
  user_get_by_id,
  user_delete,
  user_info_update_put,
  checkToken,
  user_info_update_by_admin_put,
};
