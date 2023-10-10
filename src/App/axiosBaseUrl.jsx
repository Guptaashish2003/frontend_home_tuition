import axios from "axios";

// Server URL
// const axiosBaseUrl = axios.create({baseURL:"https://api.studyspotindia.com/api/v1" });
const axiosBaseUrl = axios.create({baseURL:"http://localhost:4000/api/v1" });
export default axiosBaseUrl;
