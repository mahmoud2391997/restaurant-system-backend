import { Request, Response } from 'express'
import Branch from '../models/branch'

// Create a new branch
export const createBranch = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const branch = await Branch.create(req.body)

    res.status(201).json(branch)
  } catch (error : any) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
}

// Get all branches
export const getAllBranches = async (_: Request, res: Response) => {
  try {
    const branches = await Branch.find()
    res.status(200).json(branches)
  } catch (error : any) {
    res.status(500).json({ message: error.message })
  }
}

// Get single branch
export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findById(req.params.id)
    if (!branch) return res.status(404).json({ message: 'Branch not found' })
    res.status(200).json(branch)
  } catch (error : any) {
    res.status(500).json({ message: error.message })
  }
}

// Update branch
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!branch) return res.status(404).json({ message: 'Branch not found' })
    res.status(200).json(branch)
  } catch (error : any) {
    res.status(400).json({ message: error.message })
  }
}

// Delete branch
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id)
    if (!branch) return res.status(404).json({ message: 'Branch not found' })
    res.status(200).json({ message: 'Branch deleted successfully' })
  } catch (error : any) {
    res.status(500).json({ message: error.message })
  }
}
