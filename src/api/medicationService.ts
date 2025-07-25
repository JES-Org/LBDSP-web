/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { api } from "./auth";
const API_BASE_URL = "https://lbdsp-backend.onrender.com/api";
export const searchPharmacyMedications = async (pharmacyId: string, query: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}/medications/search/`, {
        params: { query },
      });
      return response.data; 
    } catch (error:any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        return { error: error.response.data.error || error.response.data.message };
      } else if (error.request) {
        console.error("Error request:", error.request);
        return { error: "No response from server. Please try again later." };
      } else {
        console.error("Error message:", error.message);
        return { error: error.message };
      }
    }
};
export const getPharmacyMedicationDetail = async (pharmacyId: string, medicationId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}/medications/${medicationId}/`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.error || "An error occurred while fetching medication details.",
    };
  }
};



export const fetchMedicationCounts = async () => {
  try {
    const response = await api.get('/medications_counts/');
    return response.data;
  } catch (error) {
    console.error("Error fetching medication counts:", error);
    throw error;
  }
};


export const fetchMostSearchedMedications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/most-searched-medications/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching most searched medications:", error);
    return [];
  }
};

export const getPhaMostSearchedMedications = async () => {
  try {
    const response = await api.get('/pharmacy/most-searched-medications/');
    return response.data; 
  } catch (error) {
    console.error('Error fetching most searched medications:', error);
    throw error; 
  }
};