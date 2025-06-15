import { Router } from "express";
import {
  createStockAdjustment,
  getStockAdjustments,
  getStockAdjustmentById,
  updateStockAdjustment,
  deleteStockAdjustment,
} from "../controllers/stockAdjustment.controller";

const router = Router();

router.post("/", createStockAdjustment);
router.get("/", getStockAdjustments);
router.get("/:id", getStockAdjustmentById);

export default router;
