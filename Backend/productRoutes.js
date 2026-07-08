const adminAuth =
require("../middleware/adminAuth");

router.post(
  "/add-product",
  adminAuth,
  async (req, res) => {

    // save product

    res.json({
      message: "Product Added"
    });
});