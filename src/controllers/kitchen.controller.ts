import KitchenOrderItem from "../models/kitchenOrderItem";
import { Request, Response } from "express";
import KitchenOrder from "../models/kitchenOrder";
import KitchenStation from "../models/station";

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await KitchenOrder.find();
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  const order = new KitchenOrder(req.body);
  await order.save();
  res.status(201).json(order);
};

export const getAllStations = async (req: Request, res: Response) => {
  const stations = await KitchenStation.find();
  res.json(stations);
};

export const createStation = async (req: Request, res: Response) => {
  const station = new KitchenStation(req.body);
  await station.save();
  res.status(201).json(station);
};

// Get all items
export const getAllItems = async (_req: Request, res: Response) => {
  const items = await KitchenOrderItem.find();
  res.json(items);
};

// Create item
export const createItem = async (req: Request, res: Response) => {
  const item = new KitchenOrderItem(req.body);
  await item.save();
  res.status(201).json(item);
};

// Get item by ID
export const getItemById = async (req: Request, res: Response) => {
  const item = await KitchenOrderItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

// Update item
export const updateItem = async (req: Request, res: Response) => {
  const item = await KitchenOrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

// Delete item
export const deleteItem = async (req: Request, res: Response) => {
  const item = await KitchenOrderItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
};
