import { Router } from "express";
import {
  // Inventory Items
  createInventoryItem,
  getInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,

  // Stock Adjustments
  createStockAdjustment,
  getStockAdjustments,
  getStockAdjustmentById,
  updateStockAdjustment,
  deleteStockAdjustment,

  // Stock Movements
  createStockMovement,
  getAllStockMovements,
  getStockMovementById,

  // Recipes
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,


  createPurchaseOrder,
getAllPurchaseOrders,
getPurchaseOrderById,
updatePurchaseOrder,
deletePurchaseOrder,


    createInventoryLog,
  getAllInventoryLogs,
  getInventoryLogById,
  updateInventoryLog,
  deleteInventoryLog,
} from "../controllers/inventorty";

const router = Router();

/* ========== Inventory Items ========== */
router.post("/item", createInventoryItem);
router.get("/item", getInventoryItems);
router.get("/item/:id", getInventoryItemById);
router.put("/item/:id", updateInventoryItem);
router.delete("/item/:id", deleteInventoryItem);

/* ========== Stock Adjustments ========== */
router.post("/adjustment", createStockAdjustment);
router.get("/adjustment", getStockAdjustments);
router.get("/adjustment/:id", getStockAdjustmentById);
router.put("/adjustment/:id", updateStockAdjustment);
router.delete("/adjustment/:id", deleteStockAdjustment);

/* ========== Stock Movements ========== */
router.post("/movement", createStockMovement);
router.get("/movement", getAllStockMovements);
router.get("/movement/:id", getStockMovementById);

/* ========== Recipes ========== */
router.post("/recipe", createRecipe);
router.get("/recipe", getAllRecipes);
router.get("/recipe/:id", getRecipeById);
router.put("/recipe/:id", updateRecipe);
router.delete("/recipe/:id", deleteRecipe);


router.post("/purchaseOrders", createPurchaseOrder);
router.get("/purchaseOrders", getAllPurchaseOrders);
router.get("/purchaseOrders/:id", getPurchaseOrderById);
router.put("/purchaseOrders", updatePurchaseOrder);
router.delete("/purchaseOrders", deletePurchaseOrder);





router.post("/logs", createInventoryLog);
router.get("/logs", getAllInventoryLogs);
router.get("/logs/:id", getInventoryLogById);
router.put("/logs/:id", updateInventoryLog);
router.delete("/logs/:id", deleteInventoryLog);

export default router;


