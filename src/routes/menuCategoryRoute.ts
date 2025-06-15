import express from "express";
import {
  getAllMenuCategories,
  getMenuCategoryById,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from "../controllers/menuCategoryController";

const router = express.Router({ mergeParams: true });

router.route("/")
  .get(getAllMenuCategories)
  .post(createMenuCategory);

router.route("/:id")
  .get(getMenuCategoryById)
  .put(updateMenuCategory)
  .delete(deleteMenuCategory);

export default router;
