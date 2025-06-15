import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantContoller";

const router = express.Router();

router.route("/")
  .get(getAllRestaurants)
  .post(createRestaurant);

router.route("/:id")
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

export default router;
