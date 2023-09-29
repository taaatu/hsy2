"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    user_list_get,
    user_post,
    user_get_by_id,
    user_delete,
    user_info_update_put
} = require("../controllers/userController");

router
    .route("/")
    .get(user_list_get)
    .post(
        body("full_name").isLength({ min: 3 }),
        body("email").isEmail(),
        body("password").matches("(?=.*[A-Z]).{8,}"),
        body("company").notEmpty(),
        user_post
);
router
    .route("/userid/:userId")
    .get(user_get_by_id)
    .delete(user_delete);
router
    .route("/update/:userId")
    .put(
        body("full_name").isLength({ min: 3 }),
        body("email").isEmail(),
        body("password").matches("(?=.*[A-Z]).{8,}"),
        body("company").notEmpty(),
        user_info_update_put
    ); 
     

module.exports = router;
