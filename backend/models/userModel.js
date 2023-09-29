"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query("SELECT * FROM user");
        return rows;
    } catch (e) {
        
    }
};

const insertUser = async (user) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO user (full_name, password, email, company, user_group) VALUES (?,?,?,?,?)",
            [user.full_name, user.password, user.email, user.company, "1"]
        );
        console.log("model insert user", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model insert user", e.message);
    }
}; 

const getUserById = async (userId, next) => {
    try {
      const [rows] = await promisePool.execute(
        "SELECT * FROM user WHERE user_id = ?",
        [userId]
      );
      console.log("Get by user id result?", rows);
      return rows[0];
    } catch (e) {
        console.error("model get user by id", e.message);
        const err = httpError("Sql error", 500);
        next(err);
    }
};
  
const deleteUser = async (userId) => {
    try {
        const [rows] = await promisePool.execute(
            "DELETE FROM user WHERE user_id = ?",
            [userId]
        );
        console.log("model delete user", rows);
        return true;
    } catch (e) {
        console.error("model delete user", e.message);
    }
};

const updateUserInfo = async (user, userId) => {
    try {
        console.log(user);
        console.log(userId);
        const [rows] = await promisePool.execute(
            "UPDATE user SET full_name = ?, password = ?, email = ?, company = ? WHERE user_id = ?",
            [user.full_name, user.password, user.email, user.company, userId]
        );
        return rows.affectedRows === 1;
    } catch (e) {
        console.error("model update user info", e.message);
    }
}; 
  
module.exports = {
    getAllUsers,
    insertUser,
    getUserById,
    deleteUser,
    updateUserInfo
}; 