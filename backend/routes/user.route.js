import express from "express";
import { register, logout, login, updateProfile, getProfile, forgotPassword, resetPassword } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from 'multer';
import { singleUpload } from "../middlewares/mutler.js";
const router = express.Router();
const upload = multer();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/auth/forgot-password").post(forgotPassword);
router.route("/auth/reset-password").post(resetPassword);

export default router;
