import express from "express";
const router = express.Router();

import {
  getAllMenuCategories,
  getMenuCategoryById,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory
} from "../controllers/menuManagment";

import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuManagment";

import {
  getAllModifiers,
  getModifierById,
  createModifier,
  updateModifier,
  deleteModifier
} from "../controllers/menuManagment";

import {
  addItemModifier,
  getModifiersByMenuItem,
  deleteItemModifier
} from "../controllers/menuManagment";

// Menu Category Routes
router.get("/categories", getAllMenuCategories);
router.get("/categories/:id", getMenuCategoryById);
router.post("/categories", createMenuCategory);
router.put("/categories/:id", updateMenuCategory);
router.delete("/categories/:id", deleteMenuCategory);

// Menu Item Routes
router.get("/items", getAllMenuItems);
router.get("/items/:id", getMenuItemById);
router.post("/items", createMenuItem);
router.put("/items/:id", updateMenuItem);
router.delete("/items/:id", deleteMenuItem);

// Modifier Routes
router.get("/modifiers", getAllModifiers);
router.get("/modifiers/:id", getModifierById);
router.post("/modifiers", createModifier);
router.put("/modifiers/:id", updateModifier);
router.delete("/modifiers/:id", deleteModifier);

// Item Modifier Routes
router.post("/item-modifiers", addItemModifier);
router.get("/items/:menuItemId/modifiers", getModifiersByMenuItem);
router.delete("/item-modifiers/:id", deleteItemModifier);

export default router;
