import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct, getSingleProduct, getProductsByCategory } from "../controllers/products/product";
import authenticate from "../middleware";
import { upload } from "../utils/image-upload";



const router = Router();



router.get("/category", getProductsByCategory);
router.use(authenticate);

router.get("/", getAllProducts);
router.post("/", upload.array("images", 10), addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getSingleProduct);

export default router;