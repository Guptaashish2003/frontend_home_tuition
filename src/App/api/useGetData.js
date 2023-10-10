
import axiosBaseUrl from "../axiosBaseUrl";
export const useGetData = async (url) => {
    const res = await axiosBaseUrl.get(url);
   return (res.data)
};

export const useGetDataProtected = async (url) => {
    const role = localStorage.getItem("Role");
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const res = await axiosBaseUrl.get(`/${role}${url}`, config);

    const data = res.data;
    return {...data, role};
};
export const useGetUserData = async (url) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const res = await axiosBaseUrl.get(`/${url}`, config);
    const data = res.data;
    return data;
};
