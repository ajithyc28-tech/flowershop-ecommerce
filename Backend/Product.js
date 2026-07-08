const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
  name:String,
  price:Number,
  image:String,
  description:String,
  stockstatus:String,
  category:String
})
module.exports=mongoose.model(
  "product",
  ProductSchema
);