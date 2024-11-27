import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "userInfo",
  () => {
    const isLogin = ref(false);
    const userInfo = ref({
      id: "",
      name: "",
      tasks: [],
      role: "",
    });
    const jwtToken = ref(null);

    function login(loginInfo, token) {
      jwtToken.value = token;
      userInfo.value = loginInfo
    }

    function logout() {
      userInfo.value = {
        id: "",
        name: "",
        tasks: [],
        role: "",
      };
      isLogin.value = false;
      jwtToken.value = null
    }

    return {
      isLogin,
      userInfo,
      login,
      logout
    };
  },
  {
    persist: {
      storage: localStorage,
      key: "userInfo",
    },
  }
);
