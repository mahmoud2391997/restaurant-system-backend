import type { Request, Response, NextFunction } from "express"
import { auth } from "@/config/db"
import { logger } from "@/utils/logger"
import { type Permission, EmployeeRole } from "@/types"

export interface AuthRequest extends Request {
  user?: {
    uid: string
    email: string
    role: EmployeeRole
    permissions: Permission[]
  }
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Access token required" })
    }

    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token)

    // Get user details from Firestore (you'll need to implement this)
    // For now, we'll use basic info from the token
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      role: EmployeeRole.ADMIN, // This should come from your user document
      permissions: [], // This should come from your user document
    }

    next()
  } catch (error) {
    logger.error("Authentication error:", error)
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}

export const requirePermission = (permission: Permission) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    next()
  }
}

export const requireRole = (roles: EmployeeRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient role permissions" })
    }

    next()
  }
}
