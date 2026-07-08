const mongoose = require("mongoose");

const CartSchema =
new mongoose.Schema({

  email: String,
  productId: String

});

module.exports =
  mongoose.model(
    "Cart",
    CartSchema
  );