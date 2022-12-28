const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const unitRoutes = require("./src/routes/units");
const shopRoutes = require("./src/routes/shops");
const ingredientRoutes = require("./src/routes/ingredients");
const menuRoutes = require("./src/routes/menus");
const userRoutes = require("./src/routes/user");

const User = require("./src/models/user");
const Unit = require("./src/models/unit");
const Shop = require("./src/models/shop");
const Ingredient = require("./src/models/ingredient");
const Menu = require("./src/models/menu");
const Setting = require("./src/models/setting");
const app = express();

console.log("Connecting to " + process.env.CATERING_MANAGEMENT_SYSTEM_CONNECTION_STRING);
mongoose
  .connect(process.env.CATERING_MANAGEMENT_SYSTEM_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("Connected to database!");
    Setting.findOne({ name: "dateFirstStart" }).then((result) => {
      if (!result) {
        console.log("Initializing database");
        User.initData(User).then((_) => {
          Unit.initData(Unit).then((_) => {
            Shop.initData(Shop).then((_) => {
              Ingredient.initData(Ingredient).then((_) => {
                Menu.initData(Menu).then((_) => {
                  Setting.initData(Setting).then((_) => {
                    app.emit("databaseReady");
                  });
                });
              });
            });
          });
        });
      }
    });
    return;
  })
  .catch(() => {
    console.log("Contection failed");
  });

function disconnectDatabase() {
  console.log("Disconnecting database");
  mongoose.disconnect();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.get('/',(req,res)=>{
  res.status(200).json({
    message: "OK",
  });
});
app.use("/api/units", unitRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/menus", menuRoutes);

module.exports = app;
module.exports.disconnectDatabase = disconnectDatabase;
