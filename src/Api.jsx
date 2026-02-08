import axios from "axios";

const API = axios.create({
  baseURL: "https://healthcare-be-1-smd2.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;
