import { defineStore } from "pinia";
import { ref } from "vue";

const routeIndexMap = {
    "home": 0,
    "visual": 1,
    "task": 2,
}

export const useNavStore = defineStore("navStore", () => {
    const curIndex = ref(0);

    function navChange(pathRoute) {
        curIndex.value = routeIndexMap[pathRoute]
        return curIndex.value;
    }

    return {
        curIndex,
        navChange
    }
});
