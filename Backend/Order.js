const mongoose = require("mongoose");

const OrderSchema =
new mongoose.Schema({

    email:String,

    name:String,

    phone:String,

    address:String,

    pincode:String,

    productId:String,

    productName:String,

    productPrice:Number,

    productImage:String,

    productDescription:String,

    productCategory:String,

    productStock:Number,

    quantity:Number,

    status:{
        type:String,
        default:"Pending"
    }

});

module.exports =
mongoose.model(
    "Order",
    OrderSchema
);