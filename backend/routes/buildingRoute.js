"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    building_list_get,
    building_post,
    building_get_by_id,
    building_delete,
    building_info_update_put
} = require("../controllers/buildingController");

router
    .route("/")
    .get(building_list_get)
    .post(
        body("street").notEmpty(),
        body("post_code").matches(/^\d{5}$/).withMessage('Postcode must have exactly 5 digits'),
        body("city").notEmpty(),
        body("name").notEmpty(),
        building_post
    );

router
    .route("/buildingid/:buildingId")
    .get(building_get_by_id)
    .delete(building_delete)
    .put(
        body("street").notEmpty(),
        body("post_code").matches(/^\d{5}$/).withMessage('Postcode must have exactly 5 digits'),
        body("city").notEmpty(),
        body("name").notEmpty(),
        building_info_update_put
    );
     

module.exports = router;