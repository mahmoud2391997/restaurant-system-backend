import { Router } from "express"
import { authenticateToken } from "@/middleware/auth"
import { validateBody } from "@/middleware/validation"
import { asyncHandler } from "@/middleware/errorHandler"
import { auth } from "@/config/db"
import Joi from "joi"

const router = Router()

const loginSchema = Joi.object({
  idToken: Joi.string().required(),
})

export const verifyToken = asyncHandler(async (req: any, res: any) => {
  const { idToken } = req.body

  try {
    const decodedToken = await auth.verifyIdToken(idToken)

    // Here you would typically fetch user details from Firestore
    // and return user info with permissions

    res.json({
      success: true,
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        // Add role and permissions from your user document
      },
      message: "Token verified successfully",
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid token",
    })
  }
})

export const getCurrentUser = asyncHandler(async (req: any, res: any) => {
  res.json({
    success: true,
    data: req.user,
  })
})

router.post("/verify", validateBody(loginSchema), verifyToken)
router.get("/me", authenticateToken, getCurrentUser)

export default router
