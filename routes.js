"use strict";
const express = require("express");
const cart = express.Router();
const pool = require("./pg-connecton-pool");

cart.get("/cart-items", function(req, res) {
    pool.query("select * from ShoppingCart").then(function(result) {
        res.send(result.rows);
    });
});

cart.post("/cart-items", function(req, res) {
    pool.query("insert into ShoppingCart (product, quantity, price) values ($1::text, $2::int, $3::int)",
    [req.body.product, req.body.quantity, req.body.price]).then(function() {
        pool.query("select * from ShoppingCart").then(function(result) {
            res.send(result.rows);
        });
    });
});

cart.put("/cart-items/:id", function(req, res) {
    pool.query("update ShoppingCart set product=$1::text, quantity=$2::int, price=$3::int where id=$4::int",
    [req.body.product, req.body.quantity, req.body.price, req.params.id]).then(function() {
        pool.query("select * from ShoppingCart order by id asc").then(function(result) {
            res.send(result.rows);
        });
    });
});

cart.delete("/cart-items/:id", function(req, res) {
    pool.query("delete from ShoppingCart where id=$1::int", [req.params.id]).then(function() {
        pool.query("select * from ShoppingCart order by id asc").then(function(result) {
            res.send(result.rows);
        });
    });
});

module.exports = cart;