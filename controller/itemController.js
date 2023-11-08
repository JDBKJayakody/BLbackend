"use strict";

const Joi = require('joi');
const passwordHash = require("password-hash");
const { itemSchemaModel } = require('../models/itemModel');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');


module.exports = {

    createItem: async (req, res) => {
        const { name, description, price, category,quantity } = req.body;

        var post_img ='';

        if (req.file) {
            post_img = req.file.filename;
        }


        const itemModel = itemSchemaModel({
            name: name,
            description: description,
            price: price,
            category: category,
            image:post_img,
            quantity:quantity
        });


        itemModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err,
                    chatId: []
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: itemModel
                });
            }
        });
    },
    //



    getItems: async (req, res) => {
        const data = await itemSchemaModel.find({is_deleted:false}).sort({ created: -1 });
        if (!data) {
            res.status(500).json({ error: true, data: "no items found !" });
        } else {
            res.status(200).json({ error: false, data: data });
        }

    },

    getSingleItem: async (req, res) => {

        const data = await itemSchemaModel.find({
            _id: req.body.item_id
        });
        if (!data) {
            res.status(200).json({ error: true, data: [] });
        } else {
            res.status(200).json({ error: false, data: data });
        }

    },

    updateItem: async (req, res) => {
        const { item_id, name, description, price, category,quantity } = req.body;
        console.log({ item_id, name, description, price, category,quantity });

        itemSchemaModel.updateOne({_id:item_id}, { $set: {
            name: name,
            description: description,
            price: price,
            category: category,
            quantity:quantity
        }}, (err, response) => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err
                });
            } else {
                res.status(200).json({
                    error: false
                });
            }
          }); 
    },

    deleteItem: async (req, res) => {
        const { item_id, is_deleted } = req.body;

        itemSchemaModel.updateOne({_id:item_id}, { $set: {
            is_deleted: is_deleted
        }}, (err, response) => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err
                });
            } else {
                res.status(200).json({
                    error: false
                });
            }
          }); 
    },


    getStockOfCategory: async (req, res) => {
        const data = await itemSchemaModel.find({
            category: req.body.category,
            is_deleted:false,
        });
        if (!data) {
            res.status(200).json({ error: true, data: [] });
        } else {
            res.status(200).json({ error: false, data: data });
        }

    },
};


