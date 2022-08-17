import { Router } from "express";
import productRoutes from "./products.route";
import authRoutes from "./auth.route";

const router = Router();

router.use("/products", productRoutes);
router.use("/auth", authRoutes);

export default router;