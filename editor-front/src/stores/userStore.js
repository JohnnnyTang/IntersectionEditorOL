import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "userInfo",
  () => {
    const isLogin = ref(false);
    const userInfo = ref({
      id: "",
      name: "",
    });

    return {
      isLogin,
      userInfo,
    };
  },
  {
    persist: {
      storage: localStorage,
      key: "userInfo"
    },
  }
);
