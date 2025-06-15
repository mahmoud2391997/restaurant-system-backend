import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  getAllStations,
  createStation,
} from "../controllers/kitchen.controller";
import {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/kitchen.controller";

const router = Router();

router.get("/orders", getAllOrders);
router.post("/orders", createOrder);

router.get("/stations", getAllStations);
router.post("/stations", createStation);
router.get("/item", getAllItems);
router.post("/item", createItem);
router.get("/item/:id", getItemById);
router.put("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);

export default router;
