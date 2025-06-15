import { db, realtimeDb } from "@/config/db"
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  type QueryConstraint,
} from "firebase-admin/firestore"
import { ref, set, update, remove, push, onValue, off } from "firebase-admin/database"
import type { BaseEntity, QueryParams, PaginationInfo } from "@/types"
import { calculatePagination, generateId } from "@/utils/helpers"
import { logger } from "@/utils/logger"

export class FirestoreService<T extends BaseEntity> {
  private collectionName: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    try {
      const now = new Date()
      const docData = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      } as T

      const docRef = await addDoc(collection(db, this.collectionName), docData)
      return { ...docData, id: docRef.id }
    } catch (error) {
      logger.error(`Error creating document in ${this.collectionName}:`, error)
      throw error
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T
      }
      return null
    } catch (error) {
      logger.error(`Error finding document by ID in ${this.collectionName}:`, error)
      throw error
    }
  }

  async findAll(queryParams: QueryParams): Promise<{ data: T[]; pagination: PaginationInfo }> {
    try {
      const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc", filters } = queryParams

      const constraints: QueryConstraint[] = []

      // Add filters
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            constraints.push(where(key, "==", value))
          }
        })
      }

      // Add search (this is basic - you might want to implement full-text search)
      if (search) {
        constraints.push(where("name", ">=", search))
        constraints.push(where("name", "<=", search + "\uf8ff"))
      }

      // Add sorting
      constraints.push(orderBy(sortBy, sortOrder))

      // Add pagination
      constraints.push(limit(limit))

      const q = query(collection(db, this.collectionName), ...constraints)
      const querySnapshot = await getDocs(q)

      const data: T[] = []
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as T)
      })

      // Get total count (this is approximate - for exact count, you'd need a separate query)
      const totalQuery = query(collection(db, this.collectionName), ...constraints.slice(0, -1))
      const totalSnapshot = await getDocs(totalQuery)
      const total = totalSnapshot.size

      const pagination = calculatePagination(page, limit, total)

      return { data, pagination }
    } catch (error) {
      logger.error(`Error finding documents in ${this.collectionName}:`, error)
      throw error
    }
  }

  async update(id: string, data: Partial<Omit<T, "id" | "createdAt">>): Promise<T> {
    try {
      const docRef = doc(db, this.collectionName, id)
      const updateData = {
        ...data,
        updatedAt: new Date(),
      }

      await updateDoc(docRef, updateData)

      const updatedDoc = await this.findById(id)
      if (!updatedDoc) {
        throw new Error("Document not found after update")
      }

      return updatedDoc
    } catch (error) {
      logger.error(`Error updating document in ${this.collectionName}:`, error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id)
      await deleteDoc(docRef)
    } catch (error) {
      logger.error(`Error deleting document in ${this.collectionName}:`, error)
      throw error
    }
  }

  async findWhere(field: string, operator: any, value: any): Promise<T[]> {
    try {
      const q = query(collection(db, this.collectionName), where(field, operator, value))
      const querySnapshot = await getDocs(q)

      const data: T[] = []
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as T)
      })

      return data
    } catch (error) {
      logger.error(`Error finding documents where ${field} ${operator} ${value}:`, error)
      throw error
    }
  }
}

export class RealtimeService {
  async set(path: string, data: any): Promise<void> {
    try {
      const dbRef = ref(realtimeDb, path)
      await set(dbRef, data)
    } catch (error) {
      logger.error(`Error setting data at ${path}:`, error)
      throw error
    }
  }

  async update(path: string, data: any): Promise<void> {
    try {
      const dbRef = ref(realtimeDb, path)
      await update(dbRef, data)
    } catch (error) {
      logger.error(`Error updating data at ${path}:`, error)
      throw error
    }
  }

  async push(path: string, data: any): Promise<string> {
    try {
      const dbRef = ref(realtimeDb, path)
      const newRef = await push(dbRef, data)
      return newRef.key!
    } catch (error) {
      logger.error(`Error pushing data to ${path}:`, error)
      throw error
    }
  }

  async remove(path: string): Promise<void> {
    try {
      const dbRef = ref(realtimeDb, path)
      await remove(dbRef)
    } catch (error) {
      logger.error(`Error removing data at ${path}:`, error)
      throw error
    }
  }

  listen(path: string, callback: (data: any) => void): () => void {
    const dbRef = ref(realtimeDb, path)
    onValue(dbRef, (snapshot) => {
      callback(snapshot.val())
    })

    return () => off(dbRef)
  }
}
