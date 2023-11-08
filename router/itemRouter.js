"use strict";

const express = require("express");
const userRouter = new express.Router();
const itemController = require('../controller/itemController');
const multer = require('multer');
const verify = require('./verifyToken');
//img path
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });



userRouter.post("/create", upload.single('img'),itemController.createItem);

userRouter.get("/get",  itemController.getItems);
userRouter.post("/getsingle",  itemController.getSingleItem);
userRouter.post("/update",  itemController.updateItem);
userRouter.post("/delete",  itemController.deleteItem);
userRouter.post("/getstockofcategory",  itemController.getStockOfCategory);



module.exports = userRouter;