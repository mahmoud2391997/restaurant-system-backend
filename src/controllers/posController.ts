import { Request, Response } from 'express';
import Order from '../models/orders';
import Transaction from '../models/transactions';
import Reservation from '../models/reservations';
import Table from '../models/table';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const orders = await Order.find();
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
};

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  const transactions = await Transaction.find();
  res.json(transactions);
};

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.status(201).json(transaction);
};

export const getReservations = async (req: Request, res: Response): Promise<void> => {
  const reservations = await Reservation.find();
  res.json(reservations);
};

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.status(201).json(reservation);
};

export const getTables = async (req: Request, res: Response): Promise<void> => {
  const tables = await Table.find();
  res.json(tables);
};

export const createTable = async (req: Request, res: Response): Promise<void> => {
  const table = new Table(req.body);
  await table.save();
  res.status(201).json(table);
};
