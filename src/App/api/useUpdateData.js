import axiosBaseUrl from "../axiosBaseUrl";
export const useUpdateData = async (url, userData) => {
    const role = localStorage.getItem("Role");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosBaseUrl.put(`/${role}${url}`,userData, config);
    const data = res.data;
    return {...data, role};

};

export const useUpdateDataWithImg = async (url, userData) => {
    const role = localStorage.getItem("Role");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },

    };
    const res = await axiosBaseUrl.put(`/${role}${url}`,userData, config);
    const data = res.data;
    return {...data, role};
};

export const useUpdateDataAdmin = async (url, userData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axiosBaseUrl.put(`/${url}`,userData, config);
  const data = res.data;
  return data

};
