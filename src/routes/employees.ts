import express from "express";
import { createEmployee, getEmployees } from "../controllers/employee.controller";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);

export default router;
