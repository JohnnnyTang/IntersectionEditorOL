<template>
  <div class="header-container">
    <div class="title-container">Road Intersection Editor</div>
    <div
      class="nav-item"
      :class="{ active: activeIndex == item.index }"
      v-for="item in navItems"
      :key="item.index"
      @click="nav2Page(item.index)"
    >
      <div class="nav-text">{{ item.name }}</div>
      <div class="dec-line"></div>
    </div>
    <div
      class="nav-item"
      :class="{ active: activeIndex == 0 }"
      @click="activeIndex = 0"
    ></div>
    <div class="avatar-container"></div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useNavStore } from "../stores/navStore";
import router from "../router";

const navStore = useNavStore();
const activeIndex = ref(0);

const navItems = ref([
  { name: "Home", path: "home", index: 0, query: null },
  { name: "Dataset", path: "visual", index: 1, query: { city: "Beijing" } },
  { name: "Tasks", path: "task", index: 2, query: null },
]);

const nav2Page = (index) => {
  activeIndex.value = index;
  router.push({
    name: navItems.value[index].path,
    query: navItems.value[index].query,
  });
};

const subscribe = navStore.$subscribe((mut, state) => {
  // console.log("header", mut);
  if (activeIndex.value != state.curIndex) {
    activeIndex.value = state.curIndex;
    console.log(state.curIndex);
  }
});

onBeforeMount(() => {
  console.log(router.currentRoute.value);
  navStore.navChange(router.currentRoute.value.path.replace("/", ""));
});
</script>

<style lang="scss" scoped>
.header-container {
  height: 7vh;
  width: 97vw;
  margin: 0;
  padding: 0;
  padding-left: 1vw;
  padding-right: 2vw;
  background-color: rgb(0, 34, 85);

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  column-gap: 5vw;

  .title-container {
    line-height: 7vh;
    font-size: calc(2.4vh + 0.6vw);
    font-family: "Lucida Handwriting";
    // font-family: "Bradley Hand";
    word-spacing: 0.4rem;
    font-weight: bolder;
    text-shadow: 0 1px 0 rgba(204, 204, 204, 0.7),
      0 2px 0 rgba(201, 201, 201, 0.6), 0 2px 0 rgba(187, 187, 187, 0.6),
      0 3px 0 rgba(185, 185, 185, 0.5), 0 5px 1px rgba(0, 0, 0, 0.1),
      0 0 4px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .nav-item {
    position: relative;
    height: 6vh;
    // line-height: 5vh;
    font-weight: 600;
    font-family: "Georgia";
    font-size: calc(1.6vh + 0.6vw);
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    margin-left: 1.5vw;
    top: 1vh;
    overflow: hidden;

    // background-color: #f0f0f015;
    &:hover {
      cursor: pointer;

      &:hover {
        .nav-text {
          color: rgba(194, 246, 255, 1);
        }
        .dec-line {
          transform: translateX(0);
        }
      }
    }

    &.active {
      .nav-text {
        color: rgba(194, 246, 255, 1);
      }
      .dec-line {
        transform: translateX(0);
      }
    }

    .nav-text {
      display: table-cell;
      vertical-align: bottom;
      margin-top: 0.4vh;
      height: 5vh;
      width: 100%;
    }

    .dec-line {
      height: 0.25vh;
      width: 100%;
      background-color: rgb(213, 249, 255);
      transform: translateX(-120%);
      transition: all 0.2s ease-in;
    }
  }

  .avatar-container {
    position: absolute;
    top: 1vh;
    right: 1vw;
    height: 5vh;
    width: 5vh;
    background-image: url("/polar-bear.png");
    background-size: contain;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
