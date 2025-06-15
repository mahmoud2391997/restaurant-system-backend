import { Request, Response } from "express";
import StockMovement from "../models/stockMovment";
import InventoryItem from "../models/inventoryItem";

export const createStockMovement = async (req: Request, res: Response) => {
  try {
    const {
      inventory_item_id,
      movement_type,
      quantity,
      reference_type,
      reference_id,
      notes,
    } = req.body;

    // Optional: Update InventoryItem stock
    const item = await InventoryItem.findById(inventory_item_id);
    if (!item) return res.status(404).json({ message: "Inventory item not found" });

    if (movement_type === "in" || "increment adjustment") item.currentStock += quantity;
    else if (movement_type === "out" || "increment adjustment") item.currentStock -= quantity;
    // "adjustment" handled separately

    await item.save();

    const movement = await StockMovement.create({
      inventory_item_id,
      movement_type,
      quantity,
      reference_type,
      reference_id,
      notes,
    });

    return res.status(201).json(movement);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create stock movement", error: err });
  }
};

export const getAllStockMovements = async (req: Request, res: Response) => {
  try {
    const movements = await StockMovement.find().populate("inventory_item_id");
    return res.status(200).json(movements);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch movements", error: err });
  }
};

export const getStockMovementById = async (req: Request, res: Response) => {
  try {
    const movement = await StockMovement.findById(req.params.id).populate("inventory_item_id");
    if (!movement) return res.status(404).json({ message: "Stock movement not found" });
    return res.status(200).json(movement);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching movement", error: err });
  }
};
