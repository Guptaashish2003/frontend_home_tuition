import axiosBaseUrl from "../axiosBaseUrl";
import { toast } from 'react-toastify'
export const usePostData = async (url, data) => {
  try {
    const role = localStorage.getItem("Role");
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const res = await axiosBaseUrl.Post(`/${role}${url}`, config);
    const data = res.data;
    return {...data, role};
  } catch (error) {
    toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
  }
};
export const usePostDataWithImg = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await axiosBaseUrl.post(url, data, config);
  return res;
};
export const usePostWithoutRole = async (url, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await axiosBaseUrl.post(url, data, config);
  return res;
};