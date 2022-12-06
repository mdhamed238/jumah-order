import { Router } from "express";
import { registerUser, loginUser, refreshUserToken, UserLogout } from "../controllers/auth/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUserToken);
router.post("/logout", UserLogout);

export default router;