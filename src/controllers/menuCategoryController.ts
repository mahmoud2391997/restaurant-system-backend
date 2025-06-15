import { Request, Response, NextFunction } from "express";
import {MenuCategory} from "../models/MenuCategory";

export const getAllMenuCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await MenuCategory.find({ restaurant_id: req.params.restaurantId });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getMenuCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await MenuCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Menu category not found" });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createMenuCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = new MenuCategory(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const updateMenuCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await MenuCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Menu category not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteMenuCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await MenuCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Menu category not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
