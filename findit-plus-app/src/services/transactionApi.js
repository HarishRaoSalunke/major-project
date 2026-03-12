import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getTransaction = async (itemId) => {
  const res = await axios.get(`${BASE_URL}/transaction/${itemId}`);
  return res.data;
};

export const startReturn = async (itemId) => {
  const res = await axios.post(`${BASE_URL}/transaction/start`, { itemId });
  return res.data;
};

export const confirmReturn = async (itemId) => {
  const res = await axios.post(`${BASE_URL}/transaction/confirm`, { itemId });
  return res.data;
};
