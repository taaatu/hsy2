'use strict';
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllBuilding = async (userGroup,userId) => {
    try {
        if (userGroup == 0) {
            const [rows] = await promisePool.execute("SELECT * FROM building");
            return rows;
        } else {
            const [rows] = await promisePool.execute("SELECT * FROM building WHERE u_id = ? ", [userId]);
            return rows;
        }
    } catch (e) {
        console.error('model get all buildings', e.message);
        throw httpError(e.message, 400);
    }
};

const insertBuilding = async (user,building) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO building (u_id, street, post_code, city, name) VALUES (?,?,?,?,?)",
            [user.user_id, building.street, building.post_code, building.city, building.name]
        );
        console.log("model insert building", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model insert building", e.message);
        throw httpError(e.message, 400);
    }
}; 

const deleteBuildingById = async (buildingId) => {
    try {
        const [rows] = await promisePool.execute(
            "DELETE FROM building WHERE building_id = ?",
            [buildingId]
        );
        console.log("model delete building", rows);
        return true;
    } catch (e) {
        console.error("model delete building", e.message);
        throw httpError(e.message, 400);
    }
};

const getBuildingById = async (buildingId) => {
    try {
        const [rows] = await promisePool.execute(
          "SELECT * FROM building WHERE building_id = ?",
          [buildingId]
        );
        console.log("Get by building id result?", rows);
        return rows[0];
    } catch (e) {
        console.error("model get building by id", e.message);
        throw httpError(e.message, 400);
    }
};

const updateBuilding = async (building, buildingId) => {
    try {
        const [rows] = await promisePool.execute(
            "UPDATE building SET street = ?, post_code = ?, city = ?, name = ? WHERE building_id = ?",
            [building.street, building.post_code, building.city, building.name, buildingId]
        );
        return rows.affectedRows === 1;
    } catch (e) {
        console.error("model update user info", e.message);
        throw httpError(e.message, 400);
    }
}; 

module.exports = {
    getAllBuilding,
    insertBuilding,
    deleteBuildingById,
    getBuildingById,
    updateBuilding
}; 