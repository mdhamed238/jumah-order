import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct, getSingleProduct } from "../controllers/products/product";
import authenticate from "../middleware";

const router = Router();


router.use(authenticate);

router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getSingleProduct);

export default router;