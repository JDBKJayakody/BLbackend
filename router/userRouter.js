"use strict";

const express = require("express");
const userRouter = new express.Router();
const userController = require("../controller/userController");
const multer = require("multer");
const verify = require("./verifyToken");
//img path
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/create", userController.createUser);

userRouter.post("/login", userController.loginUser);

userRouter.get("/getUsers", userController.getUsers);
userRouter.post("/me", userController.getMe);

userRouter.post("/delete", userController.deleteUser);
userRouter.post("/edit", userController.updateUser);

module.exports = userRouter;
