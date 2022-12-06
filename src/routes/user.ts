import { Router } from "express";
import { registerUser, loginUser, refreshUserToken } from "../controllers/auth/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUserToken);

export default router;