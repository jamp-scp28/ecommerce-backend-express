import { Router } from "express"
import productRoutes from "./products.route"
import authRoutes from "./auth.route"
import chatRoutes from "./chat.route"

const router = Router()
router.use("/products", productRoutes)
router.use("/chat", chatRoutes)
router.use("/auth", authRoutes)
export default router