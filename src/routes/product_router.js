//Third party imports
import { Router } from "express";

//Local imports
import { productValidator } from "../middlewares/product_validators.js";
import * as controller from "../controllers/product_controller.js";
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get("/", isAuth, controller.getAllProducts);

router.get("/:pid", isAuth, controller.getProductById);

router.post("/", isAuth, productValidator, controller.createProduct);

router.put("/:pid", isAuth, productValidator, controller.updateProduct);

router.delete("/:pid", isAuth, controller.deleteProduct);

export default router;
