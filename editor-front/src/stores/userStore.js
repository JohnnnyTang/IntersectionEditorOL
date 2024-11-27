import { defineStore } from "pinia";
import { ref } from "vue";
import request from "../api/request";
import axios from "axios";

export const useUserStore = defineStore(
  "userInfo",
  () => {
    const isLogin = ref(false);
    const userInfo = ref({
      uid: "",
      name: "",
      tasks: [],
      role: "",
    });
    const jwtToken = ref(null);
    const refreshToken = ref(null);

    function updateInfo(userInfoNew, token, refreshTokenNew) {
      userInfo.value = userInfoNew;
      jwtToken.value = token;
      refreshToken.value = refreshTokenNew;
    }

    async function login(email, password) {
      try {
        const loginRes = (
          await axios.post("/api/auth/login", { email, password })
        ).data;
        console.log(loginRes);
        if (loginRes.code == 200) {
          updateInfo(
            loginRes.data["userInfo"],
            loginRes.data["access_token"],
            loginRes.data["refresh_token"]
          );
          isLogin.value = true;
          return "登录成功";
        } else {
          console.log("账号或密码错误");
          return loginRes.msg;
        }
      } catch (error) {
        console.error("Error logining in:", error);
        this.logout();
        return error;
      }
    }

    async function refreshTokens() {
      try {
        if (!refreshToken.value) {
        }

        const res = (
          await request.post(`/auth/refresh`, {
            refresh_token: refreshToken.value,
          })
        ).data;
        if (res.code == 200) {
          updateInfo(
            userInfo.value,
            res.data.access_token,
            res.data.refresh_token
          );
          console.log("refresh token succeed");
          return true;
        } else {
          console.log("refresh token expire. need relogin");
          return false;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        this.logout();
        return false;
      }
    }

    function logout() {
      userInfo.value = {
        uid: "",
        name: "",
        tasks: [],
        role: "",
      };
      jwtToken.value = null;
      refreshToken.value = null;
      isLogin.value = false;
    }

    return {
      isLogin,
      userInfo,
      jwtToken,
      refreshToken,
      refreshTokens,
      login,
      logout,
    };
  },
  {
    persist: {
      storage: localStorage,
      key: "userInfo",
    },
  }
);
