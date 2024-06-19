//Third party imports
import { Router } from "express";

//Local imports
import * as controller from "../controllers/cart_controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.get("/", isAuth, controller.getAllCarts);

router.get("/:cid", isAuth,controller.getCartById);

router.post("/", isAuth,controller.createCart);

router.post("/:cid/product/:pid", isAuth,controller.saveProductToCart);

router.put("/:cid", isAuth,controller.updateCartWithProducts);

router.put("/:cid/product/:pid", isAuth,controller.updateProductQuantity);

router.delete("/:cid/product/:pid", isAuth,controller.deleteProductFromCart);

router.delete("/:cid", isAuth,controller.deleteAllProductsFromCart);

export default router;
