'use strict';
const { httpError } = require('../utils/errors');
const { validationResult } = require('express-validator');
const { getUserById } = require('../models/userModel');
const {
  getAllBuilding,
  insertBuilding,
  deleteBuildingById,
  getBuildingById,
  updateBuilding,
} = require('../models/buildingModel');

const building_list_get = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.user_id);
    const building = await getAllBuilding(user.user_group,user.user_id);
    if (user.user_group == 1) {
      building.map((building) => {
      delete building.u_id;
    });
    }
    res.json(building);
  } catch(error) {
    next(error);
  }
};

const building_post = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('building_post validation', errors.array());
      const err = httpError(errors.errors[0].msg, 400);
      next(err);
      return;
    }
    const allBuildings = await getAllBuilding(0,0);
    var saveBuilding = true;
    allBuildings.forEach((building) => {
    if ((building.street == req.body.street && building.post_code == req.body.post_code && building.city == req.body.city) ||  building.name == req.body.name) {
      saveBuilding = false;
    }
    });
    if (saveBuilding) {
      const id = await insertBuilding(req.user, req.body);
      res.json({ building_id: `${id}`, message: `Building ${req.body.name} added`, status: 200 });
    } else {
        .status(409)
        .json({ message: 'This building adress already exist', status: 409 });
    }
  } catch (error) {
      next(error);
  }
};

const building_get_by_id = async (req, res, next) => {
  try {
      const building = await getBuildingById(req.params.buildingId);
      if (!building) {
          const err = httpError(`Building not found by id ${req.params.buildingId}`, 404);
          next(err);
          return;
      } else {
        res.json(building);
      };
  } catch (error) {
      next(error);
  } 
};

const building_delete = async (req, res, next) => {
  try {
    const building = await getBuildingById(req.params.buildingId);
    await deleteBuildingById(req.params.buildingId);
    if (!building) {
      const err = httpError(`Building not found by id ${req.params.buildingId}`, 404);
      next(err);
      return;
    } else {
      res.json({ message: `Building deleted: ${req.params.buildingId}`, status: 200 });
    }
  } catch (error) {
    next(error);
  } 
};

const building_info_update_put = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('building_info_update_put validation', errors.array());
      const err = httpError('data not valid', 400);
      next(err);
      return;
    }
    const allBuildings = await getAllBuilding(0, 0);
    const currentBuilding = await getBuildingById(req.params.buildingId);
    var saveBuilding = true;
    allBuildings.forEach((building) => {
      if ((currentBuilding.building_id != building.building_id && building.street == req.body.street && building.post_code == req.body.post_code && building.city == req.body.city) || (currentBuilding.building_id != building.building_id && building.name == req.body.name)) {
        saveBuilding = false;
      }
    });
    console.log(req.body)
    if (saveBuilding) {
      await updateBuilding(req.body,req.params.buildingId);
      res.json({ building_id: `${req.params.buildingId}`, message: `Building ${req.body.name} updated`, status: 200 });
    } else {
      res.status(400).json({ message: 'This building adress already exist' , status: 400});
    }
  } catch (error) {
    next(error);
  } 
};
  
module.exports = {
  building_list_get,
  building_post,
  building_get_by_id,
  building_delete,
  building_info_update_put
};