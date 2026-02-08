import axios from "axios";

const API = axios.create({
  baseURL: "https://healthcare-be-q6pc.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;
