import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, createCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, upload.single('file'), updateCompany);

export default router;
