const express = require("express");

const orderController = require("../controllers/order");
const routes = express.Router();

routes.get("", orderController.getOrders);
routes.get("/:id", orderController.getOrder);
routes.post("", orderController.createOrder);
routes.put("/:id", orderController.updateOrder);
routes.delete("/:id", orderController.deleteOrder);

module.exports = routes;
