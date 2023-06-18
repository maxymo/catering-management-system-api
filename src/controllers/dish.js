const Dish = require("../models/dish");

exports.getDishes = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;

  try {
    const query = Dish.find();
    let fetchedDishes;

    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1));
      query.limit(pageSize);
    }

    return query
      .then((documents) => {
        fetchedDishes = documents;
        return Dish.countDocuments();
      })
      .then((count) => {
        res.setHeader("content-type", "application/json");
        res.status(200).json({
          message: "Dishes fetched successfully..",
          data: fetchedDishes,
          count: count,
        });
        return;
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching dishes failed.",
        });
      });
  } catch (err) {
    res.status(500).json({
      message: "Fetching dishes failed.",
    });
    return err;
  }
};

exports.createDish = (req, res, next) => {
  try {
    const dishName = req.body.name.trim();
    const dish = new Dish({
      readonly: false,
      name: dishName,
      description: req.body.description,
      portions: req.body.portions,
      ingredients: req.body.ingredients,
    });

    return dish
      .save()
      .then((createdDish) => {
        res.status(201).json({
          message: "Dish created succesfully.",
          id: createdDish._id,
        });
        return;
      })
      .catch((error) => {
        res.status(500).json({
          message: "Couldn't create dish",
        });
        return;
      });
  } catch (error) {
    res.status(400).json({
      message: "Some of the inputs are not valid.",
    });
    return;
  }
};

exports.deleteDish = (req, res, next) => {
  const id = req.params.id;
  Dish.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Dish deleted",
        });
      } else {
        res.status(401).json({
          message: "Not authorized!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Delete dish failed",
      });
    });
};

exports.getDish = (req, res, next) => {
  const id = req.params.id;
  const query = Dish.findById(id);

  query.then((dish) => {
    res.status(200).json({ data: dish });
  });
};

exports.updateDish = (req, res, next) => {
  try {
    const dishName = req.body.name.trim();
    const dishId = req.body.id;
    const dish = new Dish({
      _id: dishId,
      readonly: false,
      name: dishName,
      description: req.body.description,
      portions: req.body.portions,
      ingredients: req.body.ingredients,
    });
    Dish.findById(dishId).then((fetchedDish) => {
      if (!fetchedDish) {
        res.status(400).json({
          message: `Dish with id=${dishId} does not exist.`,
        });
      } else if (fetchedDish.readonly) {
        res.status(400).json({
          message: "Dish cannot be updated because is read only.",
        });
      } else {
        Dish.updateOne({ _id: dishId, readonly: false }, dish)
          .then((updatedDish) => {
            res.status(201).json({
              message: "Dish updated succesfully.",
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              message: "Couldn't update dish",
            });
          });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Some of the inputs are not valid.",
    });
  }
};
