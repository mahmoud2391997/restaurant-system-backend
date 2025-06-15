import { Request, Response } from "express";
import SupplierModel from "../models/Suppliers";

// CREATE
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = new SupplierModel(req.body);
    const saved = await supplier.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};



export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "name",
      order = "asc",
    } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
      sort?: string;
      order?: string;
    };

    const query = search
      ? { name: { $regex: new RegExp(search, "i") } }
      : {};

    const total = await SupplierModel.countDocuments(query);

    const suppliers = await SupplierModel.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.status(200).json({
      data: suppliers,
      total,
      page: +page,
      totalPages: Math.ceil(total / +limit),
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


// READ ONE
export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// UPDATE
export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const updated = await SupplierModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE
export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const deleted = await SupplierModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
