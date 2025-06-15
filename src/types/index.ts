export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  managerId: string
  isActive: boolean
  openingTime: string
  closingTime: string
  timezone: string
  createdAt: Date
  updatedAt: Date
}

export interface MenuItem extends BaseEntity {
  name: string
  description: string
  price: number
  category: string
  subcategory?: string
  ingredients: string[]
  allergens: string[]
  nutritionalInfo?: NutritionalInfo
  images: string[]
  isAvailable: boolean
  preparationTime: number
  tags: string[]
  variants?: MenuItemVariant[]
  modifiers?: MenuItemModifier[]
}

export interface NutritionalInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export interface MenuItemVariant {
  id: string
  name: string
  priceModifier: number
}

export interface MenuItemModifier {
  id: string
  name: string
  options: ModifierOption[]
  required: boolean
  maxSelections: number
}

export interface ModifierOption {
  id: string
  name: string
  price: number
}

export interface Order extends BaseEntity {
  orderNumber: string
  customerId?: string
  customerInfo: CustomerInfo
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: OrderStatus
  type: OrderType
  source: OrderSource
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  tableNumber?: string
  deliveryAddress?: Address
  estimatedDeliveryTime?: Date
  actualDeliveryTime?: Date
  notes?: string
  aggregatorOrderId?: string
}

export interface OrderItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  modifiers: SelectedModifier[]
  specialInstructions?: string
  total: number
}

export interface SelectedModifier {
  modifierId: string
  optionId: string
  name: string
  price: number
}

export interface CustomerInfo {
  name: string
  phone: string
  email?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Customer extends BaseEntity {
  name: string
  email?: string
  phone: string
  addresses: Address[]
  loyaltyPoints: number
  totalOrders: number
  totalSpent: number
  preferences: CustomerPreferences
  lastOrderDate?: Date
}

export interface CustomerPreferences {
  favoriteItems: string[]
  dietaryRestrictions: string[]
  allergies: string[]
  preferredPaymentMethod?: PaymentMethod
}

export interface InventoryItem extends BaseEntity {
  name: string
  sku: string
  category: string
  unit: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderPoint: number
  costPerUnit: number
  supplierId?: string
  expiryDate?: Date
  location: string
  isActive: boolean
}

export interface Employee extends BaseEntity {
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: EmployeeRole
  department: string
  hireDate: Date
  salary: number
  isActive: boolean
  permissions: Permission[]
  shifts: Shift[]
  address: Address
  emergencyContact: EmergencyContact
}

export interface Shift {
  id: string
  date: Date
  startTime: string
  endTime: string
  breakDuration: number
  hoursWorked: number
  status: ShiftStatus
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

export interface Supplier extends BaseEntity {
  name: string
  contactPerson: string
  email: string
  phone: string
  address: Address
  paymentTerms: string
  isActive: boolean
  categories: string[]
}

export interface Transaction extends BaseEntity {
  transactionId: string
  orderId: string
  amount: number
  paymentMethod: PaymentMethod
  status: TransactionStatus
  processedAt: Date
  refundAmount?: number
  refundedAt?: Date
  gatewayTransactionId?: string
}

// Enums
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  READY = "ready",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum OrderType {
  DINE_IN = "dine_in",
  TAKEAWAY = "takeaway",
  DELIVERY = "delivery",
}

export enum OrderSource {
  POS = "pos",
  ONLINE = "online",
  PHONE = "phone",
  AGGREGATOR = "aggregator",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  DIGITAL_WALLET = "digital_wallet",
  UPI = "upi",
  BANK_TRANSFER = "bank_transfer",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum EmployeeRole {
  ADMIN = "admin",
  MANAGER = "manager",
  CHEF = "chef",
  WAITER = "waiter",
  CASHIER = "cashier",
  DELIVERY = "delivery",
}

export enum Permission {
  VIEW_ORDERS = "view_orders",
  MANAGE_ORDERS = "manage_orders",
  VIEW_MENU = "view_menu",
  MANAGE_MENU = "manage_menu",
  VIEW_INVENTORY = "view_inventory",
  MANAGE_INVENTORY = "manage_inventory",
  VIEW_CUSTOMERS = "view_customers",
  MANAGE_CUSTOMERS = "manage_customers",
  VIEW_EMPLOYEES = "view_employees",
  MANAGE_EMPLOYEES = "manage_employees",
  VIEW_REPORTS = "view_reports",
  MANAGE_SETTINGS = "manage_settings",
}

export enum ShiftStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: PaginationInfo
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface QueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  filters?: Record<string, any>
}
