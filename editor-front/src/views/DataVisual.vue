<template>
  <div class="data-visual-container">
    <div class="map-container" id="map"></div>
    <div class="name-container">{{ curCityName }}</div>
    <div class="zoom-overlay">{{ "zoom: " + curZoom }}</div>
    <div class="feature-box"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { useCityInfoStore } from "../stores/cityInfoStore";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9obm55dCIsImEiOiJja2xxNXplNjYwNnhzMm5uYTJtdHVlbTByIn0.f1GfZbFLWjiEayI6hb_Qvg";
const tileServer = import.meta.env.VITE_MAP_TILE_SERVER;
const cityInfoStore = useCityInfoStore();
const curCityName = ref(router.currentRoute.value.query.city);

function mapFitBound2Bbox(bboxArray, map) {
  map.fitBounds([
    [bboxArray[0], bboxArray[1]],
    [bboxArray[2], bboxArray[3]],
  ]);
}

const curZoom = ref(9);

onMounted(async () => {
  console.log("mount", curCityName.value);
  if (Object.keys(cityInfoStore.cityInfo).length == 0) {
    // console.log("no info");
    await cityInfoStore.updateCityBasicInfoByCityName(curCityName.value);
    await cityInfoStore.updateCityDetailInfo(curCityName.value);

    console.log("loaded", cityInfoStore.cityInfo[curCityName.value]);
    // console.log(cityInfoStore.cityInfo)
  }
  console.log("city info visual", cityInfoStore.cityInfo);

  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [118.8, 32.1], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.on("load", async () => {
    map.on("zoom", () => {
      curZoom.value = map.getZoom().toFixed(2);
    });
    map.addSource(curCityName.value + "-cross", {
      type: "vector",
      tiles: [
        tileServer +
          `/${
            cityInfoStore.cityInfo[curCityName.value].tableName
          }/{z}/{x}/{y}?geom_column=geom&columns=type,road_num,task_id,done&id_column=id`,
        //   `/${cityInfoStore.cityInfo[curCityName.value].tableName}/{z}/{x}/{y}`,
      ],
    });

    let cityBbox = await cityInfoStore.updateCityBbox(curCityName.value, null);
    console.log("bbox", cityBbox);
    mapFitBound2Bbox(cityBbox, map);

    map.addLayer({
      id: curCityName.value + "cross-layer",
      type: "circle",
      source: curCityName.value + "-cross",
      "source-layer": cityInfoStore.cityInfo[curCityName.value].tableName,
      minzoom: 3,
      maxzoom: 22,
      paint: {
        "circle-stroke-color": "#878787",
        "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          ["literal", 0],
          14,
          ["literal", 1],
        ],
        "circle-color": [
          "match",
          ["get", "type"], // 根据 type 属性判断
          "complicated",
          "#F29325", // 如果是 highway 类型，颜色为红色
          "simple",
          "#00CCBF", // 如果是 street 类型，颜色为绿色
          "#878787", // 默认颜色为蓝色
        ],
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3,
          ["literal", 0.2],
          7,
          ["literal", 0.5],
          10,
          ["literal", 0.7],
          14,
          ["literal", 0.8],
          18,
          ["literal", 1],
          22,
          ["literal", 1],
        ],
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3,
          ["literal", 0.5],
          7,
          ["literal", 1.0],
          10,
          ["literal", 2.4],
          14,
          ["literal", 2.8],
          18,
          ["literal", 8],
          22,
          ["literal", 16],
        ],
      },
    });

    map.on("mousemove", curCityName.value + "cross-layer", (e) => {
      e.preventDefault();
      const features = map.queryRenderedFeatures(
        [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5],
        ],
        {
          layers: [curCityName.value + "cross-layer"],
        }
      );
      if (features.length > 0) {
        map.getCanvas().style.cursor = "pointer";
      }
    });
    map.on("mouseleave", curCityName.value + "cross-layer", (e) => {
      map.getCanvas().style.cursor = "grab";
    });
    map.on("click", curCityName.value + "cross-layer", function (e) {
      const features = map.queryRenderedFeatures(
        [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5],
        ],
        { layers: [curCityName.value + "cross-layer"] }
      );
      if (features.length > 0) {
        // 处理点击事件，比如显示弹出框等
        console.log("Feature clicked:", features[0].properties);
      }
    });
  });
});
</script>

<style lang="scss" scoped>
.data-visual-container {
  width: 100vw;
  height: 93vh;
  background-color: antiquewhite;

  .name-container {
    position: absolute;
    top: 8vh;
    left: 1vw;
    background-color: rgba(0, 46, 250, 0.201);
    padding: 1vh 0.5vw;
    font-weight: bold;
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
    border-radius: 6px;
    backdrop-filter: blur(4px);
    color: rgb(54, 5, 231);
  }

  .map-container {
    width: 100vw;
    height: 93vh;
  }

  .zoom-overlay {
    position: absolute;
    right: 1vw;
    bottom: 2vh;
    padding: 0.6vh 0.5vw;
    // width: 2vw;
    // height: 2vh;

    color: gray;
    background-color: rgba(240, 248, 255, 0.5);
  }

  .feature-box {
    position: absolute;
  }
}
</style>
