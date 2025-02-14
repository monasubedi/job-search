import axios from "axios";

import AUTH_AXIOS, { getUserData } from "../utils/api";
import { ROLE_USER } from "../utils/constants";
import { SaveJob } from "../utils/types";

export interface Data {
  username?: string;
  email: string;
  password: string;
}

export interface JobData {
  jobId: number;
  title: string;
  description: string;
  type: string;
  employment_type: string;
  requirements: string[];
  qualifications: string[];
}

export const login = async (data: Data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_JSEARCH_API_URL}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
export const register = async (data: Data) => {
  try {
    const formData = {
      ...data,
      role: ROLE_USER,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_JSEARCH_API_URL}/auth/register`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const saveJob = async (data: SaveJob) => {
  const userData = getUserData();

  const response = await AUTH_AXIOS.post(
    `${import.meta.env.VITE_JSEARCH_API_URL}/users/save/${
      JSON.parse(userData).userId
    }`,
    data
  );
  return response.data;
};

export const unSaveJob = async (jobId: string) => {
  const userData = getUserData();

  const response = await AUTH_AXIOS.delete(
    `${import.meta.env.VITE_JSEARCH_API_URL}/users/unsave/${jobId}/${
      JSON.parse(userData).userId
    }`
  );
  return response.data;
};

export const getSavedJobs = async () => {
  const userData = getUserData();
  const response = await AUTH_AXIOS.get(
    `${import.meta.env.VITE_JSEARCH_API_URL}/users/${
      JSON.parse(userData).userId
    }`
  );
  return response.data;
};
