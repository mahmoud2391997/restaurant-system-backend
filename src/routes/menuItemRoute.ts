import express from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController";

const router = express.Router({ mergeParams: true });

router.route("/")
  .get(getAllMenuItems)
  .post(createMenuItem);

router.route("/:id")
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

export default router;
