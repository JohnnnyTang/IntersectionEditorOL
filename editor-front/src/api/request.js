import axios from "axios";
import { useUserStore } from "../stores/userStore";
import router from "../router";

const request = axios.create({
  baseURL: "/api",
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    // console.log(userStore.jwtToken)
    if (userStore.jwtToken) {
      config.headers.Authorization = `Bearer ${userStore.jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// interface PendingTask {
//   config: AxiosRequestConfig;
//   resolve: Function;
// }
// 是否还需要刷新token的标识
let refreshing = false;
// 存储未完成的请求
const task = [];

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, config } = error.response;
    const userStore = useUserStore();
    console.log("inter", error, data);

    // 如果正在刷新token，则将失败的请求挂起,
    // 存入task中等待刷新token完成在全部执行出来
    if (refreshing) {
      return new Promise((resolve) => {
        task.push({
          config,
          resolve,
        });
      });
    }

    // 如果是登录过期并且请求的地址不是 /user/refresh，就调用refreshToken
    if (data.code === 401 && config.url !== "/auth/refresh") {
      console.log("interceptor", data);
      // 此时需要刷新了
      refreshing = true;
      const res = await userStore.refreshTokens();
      // 刷新token成功
      if(!res) {
        router.push("/login")
        console.log("need to relogin...")
        return
      }
      refreshing = false;

      // 重新发送请求
      task.forEach((item) => {
        item.resolve(request(item.config));
      });

      return request(config);
    }
    return Promise.reject(error);
  }
);
export default request;
