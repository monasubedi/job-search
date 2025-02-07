import axios from "axios";

import { ROLE_USER } from "../utils/constants";

export interface Data {
  username?: string;
  email: string;
  password: string;
}

export const login = async (data: Data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_JSEARCH_API_URL}/auth/login`,
    data
  );
  return response.data;
};
export const register = async (data: Data) => {
  const formData = {
    ...data,
    role: ROLE_USER,
  };
  const response = await axios.post(
    `${import.meta.env.VITE_JSEARCH_API_URL}/auth/register`,
    formData
  );
  return response.data;
};
