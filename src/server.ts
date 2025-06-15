import express from "express";
import inventoryItemRoutes from "./routes/inventory";
import menuRoutes from "./routes/menu";
import branchRoutes from './routes/branchRoute'
import posRoute from './routes/pos'
import kitchenRoutes from './routes/kitchen.route'
import supplierRoutes from "./routes/supplier.route"
import employeeRoutes from "./routes/employees"
import rolesRoute from "./routes/role.route"
// import others...
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./config/db";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
connectDB(process.env.MONGO_URI || "mongodb+srv://Cluster44370:rPxVwmau0taAOsUJ@cluster44370.a6jdq.mongodb.net/Restaurant?retryWrites=true&w=majority")
app.use("/api/inventory", inventoryItemRoutes);
app.use("/api/menu", menuRoutes);
app.use('/api/branches', branchRoutes)
app.use('/api/pos', posRoute)
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/roles", rolesRoute);


// app.use("/api/recipes", recipeRoutes);
app.use("/api/suppliers", supplierRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
