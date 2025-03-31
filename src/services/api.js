import axios from "axios";

const API_URL = "http://localhost:3000/api"; 

export const getReportes = async () => {
    const response = await axios.get(`${API_URL}/reportes`);
    return response.data;
};

export const createReporte = async (data) => {
    const response = await axios.post(`${API_URL}/reportes`, data);
    return response.data;
};

// Agrega más funciones según lo que necesites
