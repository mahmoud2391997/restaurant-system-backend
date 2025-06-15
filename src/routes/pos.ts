import express from 'express';
import {
  getOrders, createOrder,
  getTransactions, createTransaction,
  getReservations, createReservation,
  getTables, createTable
} from '../controllers/posController';

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', createOrder);

router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);

router.get('/reservations', getReservations);
router.post('/reservations', createReservation);

router.get('/tables', getTables);
router.post('/tables', createTable);

export default router;