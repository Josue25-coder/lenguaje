import axios from "axios";

const DEFAULT_API = "http://localhost:5000";
export const API = process.env.REACT_APP_API || DEFAULT_API;

export const startCapture = (category, label) =>
  axios.post(`${API}/start_capture`, { category, label });

export const stopCapture = () =>
  axios.post(`${API}/stop_capture`);

export const trainCategory = (category) =>
  axios.post(`${API}/train`, { category });

export const listCategories = () =>
  axios.get(`${API}/list_categories`);

export const uploadDataset = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API}/upload_dataset`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🔹 NUEVA FUNCIÓN para traer datos y graficar
export const getDatasetStats = (category) =>
  axios.get(`${API}/dataset_stats`, { params: { category } });
