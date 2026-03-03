import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getNotifications = async (userId) => {
  const res = await axios.get(`${BASE_URL}/notifications/${userId}`);
  return res.data;
};
