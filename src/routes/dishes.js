const express = require("express");

const dishController = require("../controllers/dish");
const routes = express.Router();

routes.get("", dishController.getDishes);
routes.get("/:id", dishController.getDish);
routes.post("", dishController.createDish);
routes.put("/:id", dishController.updateDish);
routes.delete("/:id", dishController.deleteDish);

module.exports = routes;
