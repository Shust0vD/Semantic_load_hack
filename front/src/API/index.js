import axios from "axios";

export const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadFiles = async (files) => {
  const { data } = await $host.post("api/files/upload", { files });
  return data;
};
