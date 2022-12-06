import { Router } from "express";
import { registerUser, loginUser, refreshUserToken, UserLogout, forgotPassword, resetPassword } from "../controllers/auth/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUserToken);
router.post("/logout", UserLogout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;