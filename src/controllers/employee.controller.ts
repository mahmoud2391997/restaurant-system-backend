
// controllers/roleController.ts
import { Request, Response } from "express";
import { RoleModel } from "../models/role";

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = new RoleModel(req.body);
    const saved = await role.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getRoles = async (_: Request, res: Response) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


// controllers/permissionController.ts
import { PermissionModel } from "../models/permissions";

export const createPermission = async (req: Request, res: Response) => {
  try {
    const permission = new PermissionModel(req.body);
    const saved = await permission.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getPermissions = async (_: Request, res: Response) => {
  try {
    const permissions = await PermissionModel.find().populate("roleId");
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


// controllers/userRoleController.ts
import { UserRoleModel } from "../models/UserRole";

export const createUserRole = async (req: Request, res: Response) => {
  try {
    const userRole = new UserRoleModel(req.body);
    const saved = await userRole.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserRoles = async (_: Request, res: Response) => {
  try {
    const userRoles = await UserRoleModel.find().populate("employeeId roleId");
    res.status(200).json(userRoles);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
import { EmployeeModel } from "../models/employee";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = new EmployeeModel(req.body);
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getEmployees = async (_: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
