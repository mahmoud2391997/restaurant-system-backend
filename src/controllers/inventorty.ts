import { Request, Response } from "express";
import RecipeModel from "../models/recipe";
import StockAdjustmentModel from "../models/stockAdjustment";
import StockMovement, { IStockMovement } from "../models/stockMovment";
import InventoryItemModel from "../models/inventoryItem";
import SupplierModel from "../models/Suppliers";
import mongoose, { Types } from "mongoose";
import InventoryLogModel, { IInventoryLog } from "../models/InventoryLog";
import { PurchaseOrder } from "../models/purchaseOrder";
import { EmployeeModel } from "../models/employee";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    name: string;
  };
}

// Types and Enums
enum InventoryLogReason {
  ADJUSTMENT = "adjustment",
  MOVEMENT = "movement",
  PURCHASE_ORDER = "purchase_order",
  SALE = "sale",
  RETURN = "return"
}

interface IInventoryLogPopulated extends Omit<IInventoryLog, 'itemId'> {
  itemId: {
    _id: Types.ObjectId;
    name: string;
  };
}

interface IStockMovementPopulated extends Omit<IStockMovement, 'createdBy'> {
  createdBy: {
    _id: Types.ObjectId;
    name: string;
  };
}

/* ==================== Recipes ==================== */

// CREATE a new recipe
export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { menuItemId, ingredients } = req.body

    const newRecipe = await RecipeModel.create({
      menuItemId,
      ingredients,
    })

    res.status(201).json(newRecipe)
  } catch (error) {
    console.error("Error creating recipe:", error)
    res.status(400).json({ error: "Failed to create recipe", details: error })
  }
}

// GET all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "name",
      order = "asc",
    } = req.query;

    const query = search
      ? { name: { $regex: new RegExp(String(search), "i") } }
      : {};

    const [recipes, total] = await Promise.all([
      RecipeModel.find(query)
        .populate("ingredients.ingredientId")
        .populate("menuItemId")
        .sort({ [String(sort)]: order === "asc" ? 1 : -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      RecipeModel.countDocuments(query)
    ]);

    res.json({
      data: recipes,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit),
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch recipes",
      details: (error as Error).message,
    });
  }
};

// GET a single recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id)
      .populate("ingredients.ingredientId")
      .populate("menuItemId");
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe", details: error });
  }
};

// UPDATE a recipe
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { menuItemId, ingredients } = req.body;
    const updated = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      { menuItemId, ingredients },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Recipe not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update recipe", details: error });
  }
};

// DELETE a recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const deleted = await RecipeModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe", details: error });
  }
};

/* ==================== Stock Adjustments ==================== */

export const createStockAdjustment = async (req: Request, res: Response) => {
  try {
    const {
      itemId,
      adjustmentType,
      change,
      quantity,
      notes,
      
    } = req.body;

    const item = await InventoryItemModel.findById(itemId);
    if (!item) return res.status(404).json({ message: "Inventory item not found" });

    if (change === "increment") item.currentStock += quantity;
    else if (change === "decrement") item.currentStock -= quantity;
    else return res.status(400).json({ message: "Invalid change type" });

    await item.save();

    const adjustment = await StockAdjustmentModel.create({
      itemId,
      adjustmentType,
      change,
      quantity,
      notes,

createdBy: new Types.ObjectId("684e57d7b336ae494988ea94")    });

    await InventoryLogModel.create({
      itemId,
      change: change === "increment" ? quantity : -quantity,
      reason: "adjustment",
      referenceId: adjustment._id,
      timestamp: new Date(),
    });

    return res.status(201).json(adjustment);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create stock adjustment",
      error: (err as Error).message,
    });
  }
};

export const getStockAdjustments = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "name",
      order = "asc",
    } = req.query;

    const query = search
      ? { name: { $regex: new RegExp(String(search), "i") } }
      : {};

    const [adjustments, total] = await Promise.all([
      StockAdjustmentModel.find(query)
        .sort({ [String(sort)]: order === "asc" ? 1 : -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      StockAdjustmentModel.countDocuments(query)
    ]);

    res.json({
      data: adjustments,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit),
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getStockAdjustmentById = async (req: Request, res: Response) => {
  try {
    const adj = await StockAdjustmentModel.findById(req.params.id);
    if (!adj) return res.status(404).json({ message: "Not found" });
    res.json(adj);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateStockAdjustment = async (req: Request, res: Response) => {
  try {
    const updated = await StockAdjustmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteStockAdjustment = async (req: Request, res: Response) => {
  try {
    const deleted = await StockAdjustmentModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

/* ==================== Stock Movements ==================== */

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

    const item = await InventoryItemModel.findById(inventory_item_id);
    if (!item) return res.status(404).json({ message: "Inventory item not found" });

    if (movement_type === "in") item.currentStock += quantity;
    else if (movement_type === "out") item.currentStock -= quantity;

    await item.save();

    const movement = await StockMovement.create({
      inventory_item_id,
      movement_type,
      quantity,
      reference_type,
      reference_id,
      notes,
      createdBy: new Types.ObjectId("684e57d7b336ae494988ea94") 
    });
console.log(movement);

    await InventoryLogModel.create({
      itemId: inventory_item_id,
      change: movement_type === "in" ? quantity : -quantity,
      reason: movement_type === "in" ? "purchase_order" : "sale",
      referenceId: movement._id,
      timestamp: new Date(),
    });

    return res.status(201).json(movement);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create stock movement", error: err });
  }
};

export const getAllStockMovements = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "name",
      order = "asc",
    } = req.query;

    const query = search
      ? { name: { $regex: new RegExp(String(search), "i") } }
      : {};

    const [movements, total] = await Promise.all([
      StockMovement.find(query)
        .populate("inventory_item_id")
        .sort({ [String(sort)]: order === "asc" ? 1 : -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      StockMovement.countDocuments(query)
    ]);

    res.json({
      data: movements,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit),
    });
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

/* ==================== Inventory Items ==================== */

export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const newItem = new InventoryItemModel(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getInventoryItems = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "", sort = "name", order = "asc" } = req.query;

    const query = search
      ? { name: { $regex: new RegExp(String(search), "i") } }
      : {};

    const [items, total] = await Promise.all([
      InventoryItemModel.find(query)
        .sort({ [String(sort)]: order === "asc" ? 1 : -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      InventoryItemModel.countDocuments(query)
    ]);

    res.json({ 
      data: items, 
      total, 
      page: +page, 
      limit: +limit,
      totalPages: Math.ceil(total / +limit)
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getInventoryItemById = async (req: Request, res: Response) => {
  try {
    const item = await InventoryItemModel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await InventoryItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  try {
    const deleted = await InventoryItemModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const createPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const requiredFields = ['supplierId', 'orderDate', 'items', 'createdBy'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const { 
      supplierId, 
      orderDate, 
      expectedDeliveryDate, 
      items, 
      createdBy, 
      notes 
    } = req.body;

    const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId(supplierId)) {
      return res.status(400).json({ message: "Invalid supplierId format" });
    }

    if (!isValidObjectId(createdBy)) {
      return res.status(400).json({ message: "Invalid createdBy format" });
    }

    const supplierObjectId = new mongoose.Types.ObjectId(supplierId);
    const createdById = new mongoose.Types.ObjectId(createdBy);

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "At least one item is required" });
    }

    const requiredItemFields: ("itemId" | "item_name" | "quantity" | "unit_price")[] = ['itemId',"item_name", 'quantity', 'unit_price'];

    const computedItems = items.map((item) => {
      for (const field of requiredItemFields) {
        if (item[field] === undefined || item[field] === null) {
          throw new Error(`Item ${field} is required`);
        }
      }

      if (!isValidObjectId(item.itemId)) {
        throw new Error(`Invalid item_id: ${item.itemId}`);
      }

      const quantity = Number(item.quantity);
      const unitPrice = Number(item.unit_price);

      if (isNaN(quantity) || quantity <= 0) throw new Error("Quantity must be a positive number");
      if (isNaN(unitPrice) || unitPrice <= 0) throw new Error("Unit price must be a positive number");

      return {
        item_id: new mongoose.Types.ObjectId(item.itemId),
        item_name: item.item_name,
        quantity,
        unit_price: unitPrice,
        total_price: quantity * unitPrice,
      };
    });

    const totalAmount = computedItems.reduce((sum, item) => {
      return sum + item.total_price;
    }, 0);

    const supplier = await SupplierModel.findById(supplierObjectId).lean();
    if (!supplier || !supplier.name) {
      return res.status(400).json({ message: "Supplier not found or missing name" });
    }

    const newPO = await PurchaseOrder.create({
      supplierId: supplierObjectId,
      supplier_name: supplier.name,
      orderDate: new Date(orderDate),
      expectedDeliveryDate: expectedDeliveryDate ? new Date(expectedDeliveryDate) : undefined,
      status: "pending",
      items: computedItems,
      total_amount: totalAmount,
      createdBy: createdById,
      notes: notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await Promise.all(
      computedItems.map(item => 
        InventoryLogModel.create({
          itemId: item.item_id,
          change: item.quantity,
          reason: "purchase_order",
          referenceId: newPO._id,
          timestamp: new Date(),
          notes: `Purchase order #${newPO._id}`
        })
      )
    );

    res.status(201).json({
      success: true,
      data: newPO,
      message: "Purchase order created successfully"
    });

  } catch (err) {
    console.error("Error creating purchase order:", err);

    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ 
        success: false,
        error: "Validation error",
        details: err.message 
      });
    }

    res.status(500).json({ 
      success: false,
      error: "Internal server error",
      message: (err as Error).message 
    });
  }
};

export const getAllPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "orderDate",
      sortOrder = "desc",
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    let supplierFilter = {};

    if (search) {
      const matchingSuppliers = await SupplierModel.find({
        name: { $regex: new RegExp(String(search), "i") },
      }).select("_id");

      supplierFilter = {
        supplierId: { $in: matchingSuppliers.map((s) => s._id) },
      };
    }

    const [orders, total] = await Promise.all([
      PurchaseOrder.find(supplierFilter)
        .sort({ [String(sortBy)]: sortDirection })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      PurchaseOrder.countDocuments(supplierFilter)
    ]);

    res.status(200).json({
      data: orders,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    console.log("Error while fetching purchase orders:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id).populate("supplierId createdBy items.itemId");
    if (!order) return res.status(404).json({ message: "Purchase order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updatePurchaseOrder = async (req: Request, res: Response) => {
  try {
    const { items, ...rest } = req.body;
    let updatedFields: any = { ...rest };

    if (items && Array.isArray(items)) {
      const updatedItems = items.map((item: any) => ({
        ...item,
        totalPrice: item.quantity * item.unitPrice,
      }));
      updatedFields.items = updatedItems;
      updatedFields.totalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    const updatedPO = await PurchaseOrder.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!updatedPO) return res.status(404).json({ message: "Purchase order not found" });

    res.status(200).json(updatedPO);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deletePurchaseOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Purchase order not found" });
    res.status(200).json({ message: "Purchase order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// CREATE
export const createInventoryLog = async (req: Request, res: Response) => {
  try {
    const newLog = new InventoryLogModel(req.body);
    const saved = await newLog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllInventoryLogs = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "timestamp",
      order = "desc",
    } = req.query;

    const query = search
      ? { 
          $or: [
            { 'itemId.name': { $regex: new RegExp(String(search), "i") } },
            { reason: { $regex: new RegExp(String(search), "i") } }
          ] 
        }
      : {};

    const [logs, total] = await Promise.all([
      InventoryLogModel.find(query)
        .populate("itemId")
        .sort({ [String(sort)]: order === "asc" ? 1 : -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      InventoryLogModel.countDocuments(query)
    ]);

    const enrichedLogs = await Promise.all(
      logs.map(async (log: any) => {
        let user = "System";

        if (log.referenceId) {
          try {
            if (log.reason === InventoryLogReason.PURCHASE_ORDER) {
              const employee = await EmployeeModel.findById("684e57d7b336ae494988ea94");
console.log(employee); // Should show { _id, name, ... }

              const order = await PurchaseOrder.findById(log.referenceId)
                .populate("createdBy", "name")
                .lean();
                console.log(order);
                
              user = (order?.createdBy as any)?.name || "Unknown";
            } else if (log.reason === InventoryLogReason.ADJUSTMENT) {
              const adjustment = await StockAdjustmentModel.findById(log.referenceId)
                .populate("createdBy", "name")
                .lean();
              user = (adjustment?.createdBy as any)?.name || "Unknown";
            } else if (log.reason === InventoryLogReason.MOVEMENT) {
              const movement = await StockMovement.findById(log.referenceId)
                .populate("createdBy", "name")
                .lean();
              user = (movement?.createdBy as any)?.name || "Unknown";
            }
          } catch (e) {
            console.warn(`Could not fetch reference for log ${log._id}`);
          }
        }

        const populatedItem = log.itemId as any;
        const itemName = populatedItem?.name || "";
        const itemId = populatedItem?._id?.toString() || log.itemId?.toString() || "";

        const newQuantity = (log as any).newQuantity || 0;
        const previousQuantity = newQuantity - (log.change || 0);

        return {
          id: log._id?.toString() || "",
          action: log.reason,
          item_id: itemId,
          item_name: itemName,
          quantity_changed: log.change || 0,
          previous_quantity: previousQuantity,
          new_quantity: newQuantity,
          user,
          timestamp: log.timestamp?.toISOString() || new Date().toISOString(),
          reason: log.reason,
        };
      })
    );

    res.json({
      success: true,
      data: enrichedLogs,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit)
    });
  } catch (error) {
    console.error("Error in getAllInventoryLogs:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch inventory logs",
      message: (error as Error).message 
    });
  }
};

export const getInventoryLogById = async (req: Request, res: Response) => {
  try {
    const log = await InventoryLogModel.findById(req.params.id).populate("itemId");
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateInventoryLog = async (req: Request, res: Response) => {
  try {
    const updated = await InventoryLogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Log not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteInventoryLog = async (req: Request, res: Response) => {
  try {
    const deleted = await InventoryLogModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Log not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};