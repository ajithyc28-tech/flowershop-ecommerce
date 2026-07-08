const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const User = require("./models/User");
const nodemailer = require("nodemailer");
const Product=require("./Product");
const app = express();
const Cart = require("./Cart");
const Favorite = require("./Favorite");
const Order = require("./Order");
const multer = require("multer");
const Contact = require("./contact");
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static("uploads")
);
//IMAGE UPLOAD
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(
            null,
            "uploads/"
        );
    },
    filename:
    function(req,file,cb){
        cb(
            null,
            Date.now() +
            "-" +
            file.originalname
        );
    }
});
const upload =
multer({
    storage
});
//CONTACT
app.post(
    "/contact",
    async (req, res) => {

        const {
            name,
            email,
            number,
            message
        } = req.body;

        await Contact.create({
            name,
            email,
            number,
            message
        });

        res.json({
            message: "Sent Successfully"
        });
    }
);
app.get("/messages", async (req, res) => {

    try {

        const messages =
            await Contact.find();

        res.json(messages);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});
//PRODUCTS LIKE ADMIN PANEL
app.post(
  "/add-product",
  upload.single("image"),
  async(req,res)=>{

    const product = new Product({
      name:req.body.name,
      price:req.body.price,
      image:req.file.filename,
      description:req.body.description,
      stock:req.body.stock,
      category:req.body.category
    });

    await product.save();

    res.send("Product Added");
});

app.get("/products", async(req,res)=>{

  const products =
  await Product.find();

  res.json(products);

});

app.delete("/delete-product/:id", async(req,res)=>{

  await Product.findByIdAndDelete(
    req.params.id
  );

  res.send("Deleted");

});
//PRODUCT DETAILS
app.get("/product/:id", async (req, res) => {
    const product =
    await Product.findById(
        req.params.id
    );
    res.json(product);
});
//FAVORITE REMOVE
app.post("/add-favorite", async(req,res)=>{
    const favorite =
    new Favorite({
        email:req.body.email,
        productId:req.body.productId
    });
    await favorite.save();
    res.send("Added To Favorite");
});
app.delete(
    "/remove-favorite/:email/:productId",
    async (req, res) => {

        await Favorite.deleteOne({

            email:
            req.params.email,

            productId:
            req.params.productId

        });

        res.send(
            "Favorite Removed"
        );

    }
);
app.get("/favorites/:email", async (req, res) => {
    try {
        const favorites =
        await Favorite.find({
            email: req.params.email
        });
        console.log("Favorites:", favorites);
        const productIds =
        favorites
        .filter(item =>
            mongoose.Types.ObjectId.isValid(
                item.productId
            )
        )
        .map(item =>
            new mongoose.Types.ObjectId(
                item.productId
            )
        );
        console.log(
            "Product IDs:",
            productIds
        );
        const products =
        await Product.find({
            _id: {
                $in: productIds
            }
        });
        res.json(products);
    }
    catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        );
    }
});
app.post("/admin-login", (req, res) => {

    const { email, password } = req.body;

    if (
        email === "boss@gmail.com" &&
        password === "boss123"
    ) {

        const token = jwt.sign(
            {
                role: "admin"
            },
            "SECRET_KEY"
        );

        res.json({
            success: true,
            token: token
        });

    } else {

        res.json({
            success: false,
            message: "Invalid Login"
        });

    }

});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/flowershop"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// Register
app.post("/register", async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({
        $or: [
          { email },
          { username }
        ]
      });

    if (existingUser) {
      return res.json({
        success: false,
        message:
          "User already exists"
      });
    }

    const hashPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user = new User({
      name,
      username,
      email,
      password: hashPassword
    });

    await user.save();

    res.json({
      success: true,
      message:
        "Registration Successful"
    });

  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message:
        "Server Error"
    });
  }
});

app.post("/add-product",auth,async(req,res)=>{

    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description,
        stock:req.body.stock,
        category:req.body.category
    });

    await product.save();

    res.send("Product Added");
});

app.get("/products", async (req, res) => {

  const products =
    await Product.find();

  res.json(products);

});
app.delete(
    "/delete-product/:id",
    auth,
    async(req,res)=>{

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.send(
            "Deleted"
        );

    }
);



//CART PAGE 


app.post("/add-cart", async(req,res)=>{

    const cart = new Cart({
        email:req.body.email,
        productId:req.body.productId,
        quantity:1
    });

    await cart.save();

    res.send("Added To Cart");

});

app.get("/cart/:email", async(req,res)=>{

    const cartItems =
    await Cart.find({
        email:req.params.email
    });

    const productIds =
    cartItems.map(
        item =>
        new mongoose.Types.ObjectId(
            item.productId
        )
    );

    const products =
    await Product.find({
        _id:{
            $in:productIds
        }
    });

    const result =
    products.map(product=>{

        const cartItem =
        cartItems.find(
            item =>
            item.productId ===
            product._id.toString()
        );

        return {

            ...product.toObject(),

            quantity:
            cartItem.quantity

        };

    });

    res.json(result);

});

app.delete(
  "/cart/:id",
  async (req,res) => {

    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.send(
      "Cart Item Removed"
    );

  }
);


//ORDER PAGE
app.post(
"/place-order",
async(req,res)=>{
const product =
await Product.findById(
req.body.productId
);

const order =new Order({

name:req.body.name,
email:req.body.email,
phone:req.body.phone,
address:req.body.address,
pincode:req.body.pincode,

productId:product._id,
productName:product.name,
productPrice:product.price,
productImage:product.image,
productDescription:product.description,
productCategory:product.category,
productStock:product.stock,

quantity:req.body.quantity,

status:"Pending"

});

});
app.get(
"/my-orders/:email",
async(req,res)=>{

    const orders =
    await Order.find({
        email:req.params.email
    });

    res.json(
        orders
    );

});
app.get("/orders",auth,async(req,res)=>{

    const orders =
    await Order.find();

    const productIds =
    orders.map(
        item =>
        new mongoose.Types.ObjectId(
            item.productId
        )
    );

    const products =
    await Product.find({
        _id:{
            $in:productIds
        }
    });

    const result =
    orders.map(order=>{

        const product =
        products.find(
            p =>
            p._id.toString() ===
            order.productId
        );

        return {

            ...order.toObject(),

            productName:
            product?.name,

            productPrice:
            product?.price,

            productImage:
            product?.image

        };

    });

    res.json(result);

});

app.put(
"/update-order-status/:id",
auth,
async(req,res)=>{

    await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
        }
    );

    res.json({
        message:
        "Status Updated"
    });

});

// MYORDERS PAGE
app.get(
"/product/:id",
async(req,res)=>{

try{

console.log(
"Received ID:",
req.params.id
);

const product =
await Product.findById(
req.params.id
);

console.log(product);

res.json(product);

}
catch(err){

console.log(err);

res.status(500).send(err);

}

});
app.get(
"/my-orders/:email",
async(req,res)=>{

const orders =
await Order.find({
email:req.params.email
});

const productIds =
orders.map(
item =>
new mongoose.Types.ObjectId(
item.productId
)
);

const products =
await Product.find({
_id:{
$in:productIds
}
});

const result =
orders.map(order=>{

const product =
products.find(
p =>
p._id.toString() ===
order.productId
);

return {

...order.toObject(),

productName:
product?.name,

productPrice:
product?.price,

productImage:
product?.image,

productDescription:
product?.description,

productCategory:
product?.category,

productStock:
product?.stock

};

});

console.log("Orders:", orders);
console.log("Products:", products);
console.log("Result:", result);

res.json(result);

});
app.post("/buy", async(req,res)=>{

    const product =
await Product.findById(
    req.body.productId
);

const order =
new Order({

    email:req.body.email,

    name:req.body.name,

    phone:req.body.phone,

    address:req.body.address,

    pincode:req.body.pincode,

    productId:product._id,

    productName:product.name,

    productPrice:product.price,

    productImage:product.image,

    productDescription:
    product.description,

    productCategory:
    product.category,

    productStock:
    product.stock,

    quantity:1,

    status:"Pending"

});

await order.save();

res.send("Order Placed");
})

// Login
app.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.json({
        success: false,
        message:
          "User Not Found"
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.json({
        success: false,
        message:
          "Wrong Password"
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id
        },
        "SECRET_KEY",
        {
          expiresIn: "1d"
        }
      );

    res.json({
      success: true,
      message:
        "Login Success",
      token
    });

  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message:
        "Server Error"
    });
  }
});

// Contact
app.post("/contact", (req, res) => {
  console.log(req.body);
  res.json({
    success: true,
    message:
      "Message received successfully"
  });
});

// Forgot Password
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user =
      await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found"
      });
    }

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    user.otp = otp;

    await user.save();

    const mailOptions = {
      from: "ajithyc28@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(
      mailOptions
    );

    res.json({
      success: true,
      message: "OTP Sent"
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: "Server Error"
    });
  }
});
// Verify OTP
app.post("/verify-otp", async (req, res) => {
  console.log(req.body);
  const { email, otp } = req.body;
  console.log(email);
  console.log(otp);
  const user =
    await User.findOne({ email });
    console.log("Database OTP:", user.otp);
    console.log("Entered OTP:", otp);

  if (!user) {
    return res.json({
      success: false,
      message: "User Not Found"
    });
  }

  if (user.otp !== otp) {
    return res.json({
      success: false,
      message: "Invalid OTP"
    });
  }

  res.json({
    success: true,
    message: "OTP Verified"
  });
});

// Reset Password
app.post(
  "/reset-password",
  async (req, res) => {

    const {
      email,
      newPassword
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.json({
        success: false,
        message:
          "User Not Found"
      });
    }
    const hashPassword =
      await bcrypt.hash(
        newPassword,
        10
      );
    user.password =
      hashPassword;

    user.otp = "";

    await user.save();

    res.json({
      success: true,
      message:
        "Password Updated Successfully"
    });

  }
);
// NODEMAILER
const transporter =
nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ajithyc28@gmail.com",
    pass: "nqzokhsqucaxkssd"
  },
  tls: {
    rejectUnauthorized: false
  }
});
// MIDDLEWAR
app.get(
    "/profile",
    auth,
    (req, res) => {

        res.json({
            message: "Welcome Profile",
            user: req.user
        });

    }
);
//profile
app.get(
  "/profile",
  auth,
  async (req, res) => {

    const user =
      await User.findById(
        req.user.id
      );

    res.json(user);

  }
);

// Start Server
app.listen(
  3000,
  () => {
    console.log(
      "Server Running on Port 3000"
    );
  }
);