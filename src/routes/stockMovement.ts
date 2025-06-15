import express from "express";
import {
  createStockMovement,
  getAllStockMovements,
  getStockMovementById,
} from "../controllers/stockMovment.Controller";

const router = express.Router();

router.post("/", createStockMovement);
router.get("/", getAllStockMovements);
router.get("/:id", getStockMovementById);

export default router;
