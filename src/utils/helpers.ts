import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import type { PaginationInfo, QueryParams } from "@/types"

export const generateId = (): string => uuidv4()

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `ORD${timestamp}${random}`
}

export const generateEmployeeId = (): string => {
  const timestamp = Date.now().toString().slice(-4)
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0")
  return `EMP${timestamp}${random}`
}

export const calculatePagination = (page: number, limit: number, total: number): PaginationInfo => {
  const totalPages = Math.ceil(total / limit)
  const hasNext = page < totalPages
  const hasPrev = page > 1

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
  }
}

export const parseQueryParams = (query: any): QueryParams => {
  const { page = 1, limit = 10, search = "", sortBy = "createdAt", sortOrder = "desc", ...filters } = query

  return {
    page: Number.parseInt(page as string, 10),
    limit: Math.min(Number.parseInt(limit as string, 10), 100), // Max 100 items per page
    search: search as string,
    sortBy: sortBy as string,
    sortOrder: sortOrder as "asc" | "desc",
    filters,
  }
}

export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export const formatDate = (date: Date, format = "YYYY-MM-DD HH:mm:ss"): string => {
  return moment(date).format(format)
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "")
}

export const calculateTax = (amount: number, taxRate = 0.1): number => {
  return Math.round(amount * taxRate * 100) / 100
}

export const calculateDiscount = (amount: number, discountPercent: number): number => {
  return Math.round(amount * (discountPercent / 100) * 100) / 100
}

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const removeUndefined = (obj: any): any => {
  const cleaned: any = {};
  Object.keys(obj).forEach((key: string) => {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};
