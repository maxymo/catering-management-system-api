const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  date: { Type: Date, require: true },
  readonly: { type: Boolean, require: true },
  description: { type: String },
  menu: [
    {
      name: { type: String, require: true },
      headCount: { type: Number, require: true }
    }
  ]
});

const systemOrders = [
  {
    name: "Event at Virgin Media",
    date: "2023-06-20",
    readonly: false,
    description: "",
    menu: [
      {
        name: "Chicken Pad Thai",
        headCount: 40
      },
      {
        name: "Chicken Green Curry",
        headCount: 20,
      },
      {
        name: "Beef Stir-fry Noddles",
        headCount: 30,
      }
    ]
  },
];

orderSchema.statics.initData = async (Order) => {
  var promises = [];
  Order.deleteMany({}, (err) => {
    systemOrders.forEach((order) => {
      promises.push(Order.create(order));
    });
  });
  Promise.all(promises);
};

module.exports = mongoose.model("Order", orderSchema);
module.exports.systemOrders = function () {
  return systemOrders;
};
