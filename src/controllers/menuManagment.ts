import { Request, Response, NextFunction } from "express";
import {MenuCategory} from "../models/MenuCategory";
import MenuItem from "../models/MenuItem";
import Modifier from "../models/modifier";
import ItemModifier from "../models/itemModifier";
const getPagination = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// ========== MENU CATEGORIES ==========
export const getAllMenuCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [data, total] = await Promise.all([
      MenuCategory.find().skip(skip).limit(limit),
      MenuCategory.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({ data, total, page, limit, totalPages });
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

// ========== MENU ITEMS ==========
export const getAllMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const restaurantId = req.params.restaurantId;

    const [data, total] = await Promise.all([
      MenuItem.find({ restaurant_id: restaurantId }).skip(skip).limit(limit),
      MenuItem.countDocuments({ restaurant_id: restaurantId })
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({ data, total, page, limit, totalPages });
  } catch (error) {
    next(error);
  }
};


export const getMenuItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });

    const modifiers = await ItemModifier.find({ menuItemId: item._id }).populate("modifierId");
    res.json({ ...item.toObject(), modifiers });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = new MenuItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Menu item not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ========== MODIFIERS ==========
export const getAllModifiers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const restaurantId = req.params.restaurantId;

    const [data, total] = await Promise.all([
      Modifier.find({ restaurant_id: restaurantId }).skip(skip).limit(limit),
      Modifier.countDocuments({ restaurant_id: restaurantId })
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({ data, total, page, limit, totalPages });
  } catch (error) {
    next(error);
  }
};


export const getModifierById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const modifier = await Modifier.findById(req.params.id);
    if (!modifier) return res.status(404).json({ message: "Modifier not found" });
    res.json(modifier);
  } catch (error) {
    next(error);
  }
};

export const createModifier = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  
  try {
    const newModifier = new Modifier({...req.body,restaurant_id: "68492604b6d92a7171df1a68"});
    const saved = await newModifier.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const updateModifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Modifier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Modifier not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteModifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Modifier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Modifier not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ========== ITEM MODIFIERS ==========
export const addItemModifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newLink = new ItemModifier(req.body);
    const saved = await newLink.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const getModifiersByMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const menuItemId = req.params.menuItemId;

    const [data, total] = await Promise.all([
      ItemModifier.find({ menuItemId }).populate("modifierId").skip(skip).limit(limit),
      ItemModifier.countDocuments({ menuItemId })
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({ data, total, page, limit, totalPages });
  } catch (error) {
    next(error);
  }
};

export const deleteItemModifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await ItemModifier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item Modifier not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
