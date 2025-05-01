import axios from "axios";
import { API_URL } from "../config";

const todoApi = axios.create({
  baseURL: API_URL,
});

export default todoApi;
