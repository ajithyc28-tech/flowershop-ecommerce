const mongoose = require("mongoose");

const FavoriteSchema =
new mongoose.Schema({

  email: String,
  productId: String

});

module.exports =
  mongoose.model(
    "Favorite",
    FavoriteSchema
  );