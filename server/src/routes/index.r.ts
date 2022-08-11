import { Router } from "express";
import productRoutes from "./products.r";
import authRoutes from "./auth.r";

const router = Router();

router.use("/products", productRoutes);
router.use("/auth", authRoutes);

export default router;