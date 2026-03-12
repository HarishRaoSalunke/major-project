import express from "express";
import {
  getTransactionDetails,
  startReturnProcess,
  confirmReturn,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/:itemId", getTransactionDetails);

router.post("/start", startReturnProcess);

router.post("/confirm", confirmReturn);

export default router;
