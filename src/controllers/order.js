const Order = require("../models/order");

exports.getOrders = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;

  try {
    const query = Order.find();
    let fetchedOrders;

    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1));
      query.limit(pageSize);
    }

    return query
      .then((documents) => {
        fetchedOrders = documents;
        return Order.countDocuments();
      })
      .then((count) => {
        res.setHeader("content-type", "application/json");
        res.status(200).json({
          message: "Order fetched successfully..",
          data: fetchedOrders,
          count: count,
        });
        return;
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching orders failed.",
        });
      });
  } catch (err) {
    res.status(500).json({
      message: "Fetching orders failed.",
    });
    return err;
  }
};

exports.createOrder = (req, res, next) => {
  try {
    const orderName = req.body.name.trim();
    const order = new Order({
      readonly: false,
      name: orderName,
      date: req.body.date,
      description: req.body.description,
      menu: req.body.menu,
    });

    return order
      .save()
      .then((createdOrder) => {
        res.status(201).json({
          message: "Order created succesfully.",
          id: createdOrder._id,
        });
        return;
      })
      .catch((error) => {
        res.status(500).json({
          message: "Couldn't create order",
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

exports.deleteOrder = (req, res, next) => {
  const id = req.params.id;
  Order.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Order deleted",
        });
      } else {
        res.status(401).json({
          message: "Not authorized!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Delete order failed",
      });
    });
};

exports.getOrder = (req, res, next) => {
  const id = req.params.id;
  const query = Order.findById(id);

  query.then((order) => {
    res.status(200).json({ data: order });
  });
};

exports.updateOrder = (req, res, next) => {
  try {
    const orderName = req.body.name.trim();
    const orderId = req.body.id;
    const order = new Order({
      _id: orderId,
      readonly: false,
      name: orderName,
      date: req.body.date,
      description: req.body.description,
      menu: req.body.menu,
    });
    Order.findById(orderId).then((fetchedOrder) => {
      if (!fetchedOrder) {
        res.status(400).json({
          message: `Order with id=${orderId} does not exist.`,
        });
      } else if (fetchedOrder.readonly) {
        res.status(400).json({
          message: "Order cannot be updated because is read only.",
        });
      } else {
        Order.updateOne({ _id: orderId, readonly: false }, order)
          .then((updatedOrder) => {
            res.status(201).json({
              message: "Order updated succesfully.",
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              message: "Couldn't update order",
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
