import { Router } from "express"
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getOrdersByStatus,
  getActiveOrders,
  cancelOrder,
} from "@/controllers/orderController"
import { authenticateToken, requirePermission } from "@/middleware/auth"
import { validateBody, validateParams, validateQuery, commonSchemas } from "@/middleware/validation"
import { Permission, OrderStatus, OrderType, OrderSource, PaymentMethod, PaymentStatus } from "@/types"
import Joi from "joi"

const router = Router()

// Validation schemas
const orderItemSchema = Joi.object({
  menuItemId: Joi.string().required(),
  name: Joi.string().required(),
  price: commonSchemas.price,
  quantity: Joi.number().integer().min(1).required(),
  modifiers: Joi.array()
    .items(
      Joi.object({
        modifierId: Joi.string().required(),
        optionId: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
      }),
    )
    .default([]),
  specialInstructions: Joi.string().optional(),
  total: commonSchemas.price,
})

const createOrderSchema = Joi.object({
  customerId: Joi.string().optional(),
  customerInfo: Joi.object({
    name: Joi.string().required(),
    phone: commonSchemas.phone,
    email: commonSchemas.email.optional(),
  }).required(),
  items: Joi.array().items(orderItemSchema).min(1).required(),
  type: Joi.string()
    .valid(...Object.values(OrderType))
    .required(),
  source: Joi.string()
    .valid(...Object.values(OrderSource))
    .required(),
  paymentMethod: Joi.string()
    .valid(...Object.values(PaymentMethod))
    .required(),
  paymentStatus: Joi.string()
    .valid(...Object.values(PaymentStatus))
    .required(),
  tableNumber: Joi.string().optional(),
  deliveryAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
  }).optional(),
  notes: Joi.string().optional(),
})

// All routes require authentication
router.use(authenticateToken)

router.get("/", requirePermission(Permission.VIEW_ORDERS), validateQuery(commonSchemas.pagination), getOrders)

router.get("/active", requirePermission(Permission.VIEW_ORDERS), getActiveOrders)

router.get(
  "/status/:status",
  requirePermission(Permission.VIEW_ORDERS),
  validateParams(
    Joi.object({
      status: Joi.string()
        .valid(...Object.values(OrderStatus))
        .required(),
    }),
  ),
  getOrdersByStatus,
)

router.get(
  "/:id",
  requirePermission(Permission.VIEW_ORDERS),
  validateParams(Joi.object({ id: commonSchemas.id })),
  getOrder,
)

router.post("/", requirePermission(Permission.MANAGE_ORDERS), validateBody(createOrderSchema), createOrder)

router.patch(
  "/:id/status",
  requirePermission(Permission.MANAGE_ORDERS),
  validateParams(Joi.object({ id: commonSchemas.id })),
  validateBody(
    Joi.object({
      status: Joi.string()
        .valid(...Object.values(OrderStatus))
        .required(),
      notes: Joi.string().optional(),
    }),
  ),
  updateOrderStatus,
)

router.patch(
  "/:id/cancel",
  requirePermission(Permission.MANAGE_ORDERS),
  validateParams(Joi.object({ id: commonSchemas.id })),
  validateBody(
    Joi.object({
      reason: Joi.string().optional(),
    }),
  ),
  cancelOrder,
)

export default router
