// routes/roleRoutes.ts
import express from "express";
import { createRole, getRoles } from "../controllers/employee.controller";

const router = express.Router();

router.post("/", createRole);
router.get("/", getRoles);



// routes/permissionRoutes.ts
import { createPermission, getPermissions } from "../controllers/employee.controller";


router.post("/", createPermission);
router.get("/", getPermissions);



// routes/userRoleRoutes.ts
import { createUserRole, getUserRoles } from "../controllers/employee.controller";


router.post("/", createUserRole);
router.get("/", getUserRoles);

export default router;
