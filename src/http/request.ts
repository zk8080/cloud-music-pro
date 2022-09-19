import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 拦截器定义
export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptorsCatch?: (err: any) => any;
}

// 生成axios实例的参数，实例可以单独传入拦截器
export interface RequestConfig extends AxiosRequestConfig {
  interceptorsObj?: RequestInterceptors;
}

// loading请求数量
let loadingCount = 0;

// 打开loading
const showLoading = () => {
  loadingCount++;
  if (loadingCount > 0) {
    // Loading.show();
  }
};

// 关闭loading
const hideLoading = () => {
  loadingCount--;
  if (loadingCount <= 0) {
    // Loading.hide();
  }
};

function RequestBuilder(config: RequestConfig) {
  const { interceptorsObj, ...res } = config;

  const instance: AxiosInstance = axios.create(res);

  // 全局请求拦截器
  instance.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      // 显示loading
      showLoading();
      console.log("全局请求拦截器");
      return request;
    },
    (err: any) => err
  );

  /**
   * 实例请求拦截器
   * 要注意 axios请求拦截器为倒序执行，所以要将实例请求拦截器注册在全局请求拦截器后面
   */
  instance.interceptors.request.use(interceptorsObj?.requestInterceptors, interceptorsObj?.requestInterceptorsCatch);

  /**
   * 实例响应拦截器
   * axios响应拦截器为正序执行，所以要将实例响应拦截器注册在全局响应拦截器前面
   */
  instance.interceptors.response.use(interceptorsObj?.responseInterceptors, interceptorsObj?.responseInterceptorsCatch);

  // 全局响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("全局响应拦截器");
      // 关闭loading
      hideLoading();
      const { code, msg } = response?.data || {};
      if (code !== 200) {
        // 处理错误情况
        return Promise.reject({
          code,
          message: msg
        });
      }
      // 返回值为res.data，即后端接口返回的数据，减少解构的层级，以及统一响应数据格式。
      return response.data;
    },
    (err: any) => {
      // 关闭loading
      hideLoading();
      const { code, message } = err || {};
      return Promise.reject({
        code,
        message
      });
    }
  );

  return instance;
}

export const http = RequestBuilder({ baseURL: "/api" });
