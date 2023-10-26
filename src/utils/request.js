import axios from 'axios';

// 创建一个axios实例
const service = axios.create({
  // 请求的根路径
  baseURL: 'https://api.imooc-web.lgdsunday.club/api',
  // 请求超时时间
  timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加请求头
    config.headers.icode = 'input your icode';
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 获取响应数据中的success、message、data
  const { success, message, data } = response.data;
  // 如果success为true，返回data
  if (success) {
    return data;
  } else {
    // 如果success为false，返回一个错误信息
    return Promise.reject(new Error(message));
  }
});
export default service;