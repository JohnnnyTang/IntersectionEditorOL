<template>
  <div class="home-container">
    <div class="brief-container">
      <div class="home-title-container">
        <div class="ani-container">
          <DotLottieVue
            style="height: 13vh; width: 13vh"
            autoplay
            loop
            src="/drive-road.lottie"
          />
        </div>
        <div class="home-title-first">Road Inersection</div>
        <div class="home-title-second">Datasets</div>
      </div>
      <div class="overview-container">
        <KeyValCard
          v-for="(item, id) in keyValCardInfo"
          :key="id"
          :width="item.width"
          :height="item.height"
          :keyText="item.keyText"
          :valText="item.valText"
          :isLoading="item.isLoading"
        >
        </KeyValCard>
      </div>
    </div>
    <el-scrollbar @mousewheel="scroll" ref="scrollBar">
      <div class="scroll-container">
        <DatasetCard
          v-for="(val, key, id) in cityInfoStore.cityInfo"
          :key="id"
          :styleProps="cityDataCardStyleInfo"
          :title="key"
          :infoProps="val.info"
          :isLoading="val.isLoading"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import KeyValCard from "../components/KeyValCard.vue";
import DatasetCard from "../components/DatasetCard.vue";
import BackAPI from "../api/api";
import { onMounted, ref } from "vue";
import { capitalizeFirst } from "../utils/common";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { useCityInfoStore } from "../stores/cityInfoStore";

const cityInfoStore = useCityInfoStore();
let scrollLeft = 0;
const scrollBar = ref();
const scroll = (e) => {
  // if (
  //   e.target.className.includes("lib-desc-container") ||
  //   e.target.className.includes("lib-pic-container")
  // ) {
  //   return;
  // }
  scrollLeft += e.deltaY;
  if (scrollLeft < 0) {
    scrollLeft = 0;
  }
  scrollBar.value.setScrollLeft(scrollLeft);
};

const keyValCardInfo = ref([
  {
    width: "8vw",
    height: "10vh",
    keyText: "Total City/Region Number",
    valText: "",
    isLoading: true,
  },
  {
    width: "8vw",
    height: "10vh",
    keyText: "Total Cover Area (km2)",
    valText: "",
    isLoading: true,
  },
  {
    width: "8vw",
    height: "10vh",
    keyText: "Total Intersection Number",
    valText: "",
    isLoading: true,
  },
]);

const cityDataCardStyleInfo = ref({
  width: "28vw",
  height: "72vh",
});

// const cityInfoDict = ref({});

onMounted(async () => {
  const crossTables = await BackAPI.request4CrossTable(
    "i.table_name like '%_cross'"
  );
  // console.log(crossTables);
  const cityNum = crossTables.length;
  keyValCardInfo.value[0].valText = cityNum;
  keyValCardInfo.value[0].isLoading = false;

  const cityNameList = crossTables.map((curVal, index, arr) => {
    return cityInfoStore.initCityInfoByTableName(curVal.table_name);
  });
  // console.log(cityInfoStore.cityInfo);

  const crossNumberList = await BackAPI.request4TablesSingleQuery(
    crossTables,
    "table_name",
    "count(*)",
    "count"
  );

  crossNumberList.forEach((v, i) => {
    cityInfoStore.cityInfo[cityNameList[i]].info["Total Intersection"] = v;
  });
  // console.log("crossNumber", crossNumberList);
  const crossSum = crossNumberList.reduce((accumulator, currentItem) => {
    return accumulator + Number(currentItem); // 或者 parseInt(currentItem) 或 parseFloat(currentItem)
  }, 0);
  keyValCardInfo.value[2].valText = crossSum;

  const areaList = await BackAPI.request4TablesSingleQuery(
    crossTables,
    "table_name",
    "ST_Area(ST_Envelope(ST_Collect(geom))) AS area",
    "area"
  );
  areaList.forEach((v, i) => {
    cityInfoStore.cityInfo[cityNameList[i]].info["Cover Area"] =
      "~" + (v / 1000000).toFixed(2);
  });
  // console.log("area", areaList);
  const areaSum = areaList.reduce((accumulator, currentItem) => {
    return accumulator + Number(currentItem); // 或者 parseInt(currentItem) 或 parseFloat(currentItem)
  }, 0);
  keyValCardInfo.value[1].valText = "~" + (areaSum / 1000000).toFixed(0);

  cityNameList.forEach(async (v, i) => {
    // console.log(cityInfoStore.cityInfo[v].tableName);
    await cityInfoStore.updateCityDetailInfo(v);
  });

  // cityInfoStore.cityInfo = cityInfoStore.cityInfo
});
</script>

<style lang="scss" scoped>
.home-container {
  width: 100vw;
  height: 93vh;

  // background-color: rgb(188, 255, 255);
  overflow: hidden;
  background-image: url("/night-intersection.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  &::-webkit-scrollbar {
    display: none;
  }

  .brief-container {
    width: 96vw;
    height: 13vh;
    padding-left: 2vw;
    padding-right: 2vw;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(246, 250, 255, 0.767);
    backdrop-filter: blur(6px);

    .home-title-container {
      // width: 24vw;
      height: 11vh;
      padding-top: 1vh;
      padding-bottom: 1vh;
      // line-height: 6vh;
      font-size: calc(1.8vh + 0.7vw);
      font-weight: bold;
      color: black;

      text-align: left;
      // padding-left: 2vw;
      letter-spacing: 0.2rem;
      word-spacing: 0.4rem;
      // font-family: "Georgia";

      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      column-gap: 2vw;

      .ani-container {
        height: 13vh;
        width: 13vh;
      }

      .home-title-first {
        width: 24vw;

        text-shadow: 2px 1px 0px #fff, 3px 2px 0px rgba(0, 0, 0, 0.15);
      }
      .home-title-second {
        width: 18vw;

        text-shadow: 2px 1px 0px #fff, 3px 2px 0px rgba(0, 0, 0, 0.15);
      }
    }

    .overview-container {
      height: 11vh;
      // width: 74vw;
      padding: 1vh 4vw 1vh 4vw;
      // background-color: aliceblue;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      column-gap: 6vw;
    }
  }

  .scroll-container {
    height: 80vh;
    width: fit-content;
    padding-left: 4vw;
    padding-right: 4vw;
    background-color: rgba(0, 0, 0, 0.404);
    backdrop-filter: blur(8px);
    // overflow-x: scroll;
    // -ms-overflow-style: none;
    // scrollbar-width: none;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    column-gap: 4vw;
  }
}
</style>
