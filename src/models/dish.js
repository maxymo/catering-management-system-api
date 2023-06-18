const mongoose = require("mongoose");

const dishSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  readonly: { type: Boolean, require: true },
  description: { type: String },
  portions: { type: Number, require: true },
  ingredients: [
    {
      name: { type: String, require: true },
      unitName: { type: String, require: true },
      quantity: { type: Number, require: true }
    }
  ]
});

const systemDishes = [
  {
    name: "Pasta Carbonara",
    shopName: "Market A",
    readonly: false,
    description: "Classic recipe",
    portions: 10,
    ingredients: [
      {
        name: "Double cream",
        unitName: "ml",
        quantity: 500
      },
      {
        name: "Parmesan cheese",
        unitName: "g",
        quantity: 200,
      },
      {
        name: "Eggs",
        unitName: "quantity",
        quantity: "5",
      },
      {
        name: "Spaghetti",
        unitName: "g",
        quantity: 1000,
      },
      {
        name: "Bacon",
        unitName: "g",
        quantity: 250,
      },
      {
        name: "Salt",
        unitName: "g",
        quantity: 20,
      },
      {
        name: "Pepper",
        unitName: "g",
        quantity: 10,
      }
    ]
  },
];

dishSchema.statics.initData = async (Dish) => {
  var promises = [];
  Dish.deleteMany({}, (err) => {
    systemDishes.forEach((dish) => {
      promises.push(Dish.create(dish));
    });
  });
  Promise.all(promises);
};

module.exports = mongoose.model("Dish", dishSchema);
module.exports.systemDishes = function () {
  return systemDishes;
};
