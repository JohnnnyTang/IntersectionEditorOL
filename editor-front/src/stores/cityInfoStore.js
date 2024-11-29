import { defineStore } from "pinia";
import { ref } from "vue";
import BackAPI from "../api/api";
import { capitalizeFirst, lowercaseFirst } from "../utils/common";

const filterList = [
  "type='simple'",
  "type='complicated'",
  "road_num=3",
  "road_num=4",
];

export const useCityInfoStore = defineStore("cityInfoStore", () => {
  const cityInfo = ref({});

  function initCityInfoByTableName(tableName) {
    const cityName = capitalizeFirst(tableName.split("_")[0]);
    cityInfo.value[cityName] = {
      info: {
        "Cover Area": "",
        "Total Intersection": "",
        "Simple Intersection": "",
        "Complex Intersection": "",
        "Three-branch": "",
        "Four-branch": "",
      },
      isLoading: true,
      tableName: tableName,
      bbox: [],
    };
    return cityName;
  }

  function initCityInfoByCityName(cityName) {
    const tableName = lowercaseFirst(cityName) + "_cross";
    console.log(tableName);
    cityInfo.value[cityName] = {
      info: {
        "Cover Area": "",
        "Total Intersection": "",
        "Simple Intersection": "",
        "Complex Intersection": "",
        "Three-branch": "",
        "Four-branch": "",
      },
      isLoading: true,
      tableName: tableName,
      bbox: [],
    };
  }

  async function updateCityBasicInfoByCityName(cityName) {
    if (!cityInfo.value[cityName]) {
      initCityInfoByCityName(cityName);
    }
    console.log("asdada", cityInfo.value[cityName]);
    cityInfo.value[cityName].info["Total Intersection"] = (
      await BackAPI.request4TablesSingleQuery(
        [cityInfo.value[cityName]],
        "tableName",
        "count(*)",
        "count"
      )
    )[0];
    cityInfo.value[cityName].info["Cover Area"] = (
      await BackAPI.request4TablesSingleQuery(
        [cityInfo.value[cityName]],
        "tableName",
        "ST_Area(ST_Envelope(ST_Collect(geom))) AS area",
        "area"
      )
    )[0];
  }

  async function updateCityDetailInfo(cityName) {
    const cityRes = await BackAPI.request4SingleTableQueryMultiFilter(
      cityInfo.value[cityName].tableName,
      "count(*)",
      filterList
    );
    cityInfo.value[cityName].info["Simple Intersection"] = cityRes[0];
    cityInfo.value[cityName].info["Complex Intersection"] = cityRes[1];
    cityInfo.value[cityName].info["Three-branch"] = cityRes[2];
    cityInfo.value[cityName].info["Four-branch"] = cityRes[3];
  }

  async function updateCityBbox(cityName, dataFilter) {
    cityInfo.value[cityName].bbox = await BackAPI.request4CityDataBbox(
      cityInfo.value[cityName].tableName,
      dataFilter
    );
    return cityInfo.value[cityName].bbox;
  }

  return {
    cityInfo,
    initCityInfoByTableName,
    initCityInfoByCityName,
    updateCityBbox,
    updateCityBasicInfoByCityName,
    updateCityDetailInfo,
  };
});
