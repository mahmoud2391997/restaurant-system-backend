import { Router } from "express"
import { authenticateToken, requirePermission } from "@/middleware/auth"
import { Permission } from "@/types"

const router = Router()

router.use(authenticateToken)

router.get("/", requirePermission(Permission.VIEW_REPORTS), (req, res) => {
  res.json({ success: true, data: [], message: "Reports routes - implement as needed" })
})

export default router
