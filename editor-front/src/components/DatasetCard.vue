<template>
  <div
    class="card-container"
    :style="{ width: props.styleProps.width, height: props.styleProps.height }"
  >
    <div class="card-title">
      <div class="card-title-text">{{ props.title }}</div>
    </div>
    <div class="card-contet">
      <div
        class="key-val-col"
        v-for="(val, key, id) in props.infoProps"
        :key="id"
      >
        <div class="key-row">
          <div class="key-text">{{ key }}</div>
        </div>
        <div class="val-row">
          <div class="val-text">{{ val }}</div>
        </div>
      </div>
    </div>
    <div class="more-info-button" @click="Nav2CityMap">
      <a class="cta" href="#">
        <span>Map</span>
        <span>
          <svg
            width="3vw"
            height="3vh"
            viewBox="0 0 66 43"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="arrow"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                class="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#38a3fb"
              ></path>
              <path
                class="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#38a3fb"
              ></path>
              <path
                class="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#38a3fb"
              ></path>
            </g>
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import router from "../router";
import { useNavStore } from "../stores/navStore";
const navStore = useNavStore();

const props = defineProps(["styleProps", "infoProps", "isLoading", "title"]);
const Nav2CityMap = () => {
  navStore.curIndex = 1;
  router.push({ name: "visual", query: { city: props.title } });
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-flow: row wrap;

  background-color: rgba(214, 237, 255, 0.5);
  backdrop-filter: blur(6px);
  border-radius: 6px;
  padding: 3px;
  z-index: 2;
  position: relative;
  border: 1px solid #3905c7;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 19px 38px, rgba(0, 0, 0, 0.6) 0px 15px 12px;

  .card-title {
    height: 10vh;
    line-height: 10vh;
    font-size: calc(1.6vh + 1vw);
    letter-spacing: 0.1rem;
    font-weight: bold;
    width: 100%;
    color: white;

    border-bottom: 3px solid rgb(11, 0, 172);
  }

  .card-contet {
    height: calc(100% - 20vh);
    width: 96%;
    padding-left: 2%;
    padding-right: 2%;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    .key-val-col {
      width: 48%;
      height: 28%;

      background-color: #38a3fb;
      border-radius: 6px;
      overflow: hidden;

      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      // display: table;

      .key-row {
        height: 46%;
        width: 95%;
        padding-left: 5%;
        // display: table-cell;
        background-color: #011d99;
        display: flex;

        justify-content: flex-start;
        align-items: center;
        text-align: left;

        .key-text {
          height: fit-content;
          font-size: calc(0.6vh + 1vw);
          letter-spacing: 0.1rem;
          font-weight: bold;
        }
      }

      .val-row {
        height: 54%;
        width: 95%;
        padding-left: 5%;
        background-color: #e0f6ff;
        display: flex;
        text-align: left;
        justify-content: flex-start;
        align-items: center;
        border-top: 1px solid black;

        .val-text {
          height: fit-content;
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: calc(1vh + 1.2vw);
          letter-spacing: 0.2rem;
          font-weight: bold;
          color: #011d99;
        }
      }
      &:nth-child(2n) {
        .key-row,
        .val-row {
          padding-left: 0;
          padding-right: 5%;
          justify-content: flex-end;
          align-items: center;
          text-align: right;
        }
      }
    }
  }

  .more-info-button {
    display: flex;
    justify-content: center;
    height: 6vh;
    // width: 3vw;
    margin-left: 80%;

    .cta {
      display: flex;
      padding: 1vh 0.4vw;
      text-decoration: none;
      font-family: "Poppins", sans-serif;
      font-size: calc(0.8vw + 0.8vh);
      font-weight: bold;
      color: rgb(0, 1, 80);
      background: #f4efff;
      transition: 1s;
      box-shadow: 5px 5px 0 black;
      transform: skewX(-10deg);
      border-radius: 6px;

      &:focus {
        outline: none;
      }
      &:hover {
        transition: 0.5s;
        box-shadow: 8px 8px 0 #38a3fb;
        span:nth-child(2) {
          transition: 0.5s;
          margin-right: 1.5vw;
        }

        path.one {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.6s;
        }
        path.two {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.4s;
        }

        path.three {
          animation: color_anim 1s infinite 0.2s;
        }
      }

      path.one {
        transition: 0.4s;
        transform: translateX(-60%);
      }

      path.two {
        transition: 0.5s;
        transform: translateX(-30%);
      }

      span:nth-child(2) {
        transition: 0.5s;
        margin-right: 0px;
      }

      span {
        transform: skewX(10deg);
      }

      span:nth-child(2) {
        width: 1vw;
        margin-left: 0.3vw;
        position: relative;
        top: 12%;
      }

      @keyframes color_anim {
        0% {
          fill: #50b0ff;
        }
        50% {
          fill: rgb(46, 0, 153);
        }
        100% {
          fill: #50b0ff;
        }
      }
    }
  }
}
</style>
