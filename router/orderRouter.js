"use strict";

const express = require("express");
const userRouter = new express.Router();
const orderController = require('../controller/orderController');
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



userRouter.post("/create",orderController.createOrder);
userRouter.get("/get",orderController.getOrders);
userRouter.post("/getsummary",orderController.getOrdersSummary);
userRouter.post("/changestatus",orderController.changeOrderStatus);



module.exports = userRouter;