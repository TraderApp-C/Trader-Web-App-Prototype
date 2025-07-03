
import axios from 'axios';
const axiosClient = axios.create({
    baseURL: 'https://api.polygon.io/v3',
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

const polygionData = axios.create({
  baseURL: 'https://api.polygon.io/v2',
  headers: {
    'Content-Type': 'application/json'
  }
})
  

polygionData.interceptors.request.use(config => {
const apiKey = "T7TW2Zv03O3OE1NMmeUHu4479NnaLC87"
  config.params = {
    ...config.params,
    apiKey: apiKey
  }
  return config;
});

  
axiosClient.interceptors.request.use(config => {
  const apiKey = "T7TW2Zv03O3OE1NMmeUHu4479NnaLC87"
  config.params = {
    ...config.params,
    apiKey: apiKey
  }
  return config;
});

export const dataClient = {polygionData};
export default axiosClient;