<template>
  <div
    class="card-container"
    :style="{ width: props.width, height: props.height }"
  >
    <div class="card-key">
      <div class="card-key-text">{{ props.keyText }}</div>
    </div>
    <div class="card-value">{{ props.valText }}</div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  width: String,
  height: String,
  keyText: String,
  valText: String | Number,
  isLoading: Boolean,
});
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-flow: column nowrap;
  background-color: rgb(5, 60, 161);
  justify-content: center;
  border-radius: 6px;
  padding-left: 1vw;
  padding-right: 1vw;

  box-shadow: rgba(46, 82, 240, 0.4) 3px 3px, rgba(46, 82, 240, 0.3) 6px 6px,
    rgba(46, 82, 240, 0.2) 9px 9px, rgba(46, 82, 240, 0.15) 12px 12px,
    rgba(46, 82, 240, 0.05) 15px 15px;

  &:hover {
    box-shadow: rgba(46, 82, 240, 0.6) 3px 3px, rgba(46, 82, 240, 0.4) 6px 6px,
      rgba(46, 82, 240, 0.3) 9px 9px;
    transform: translate(2px, 2px);
    color: rgb(172, 236, 255);
    cursor: pointer;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  .card-key {
    height: 60%;
    width: 100%;
    display: table;
    font-weight: bold;
    font-size: calc(0.5vh + 0.6vw);

    .card-key-text {
      display: table-cell;
      vertical-align: middle;
    }
  }

  .card-value {
    // height: 40%;
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    border-top: 2px solid rgb(233, 235, 255);
    font-size: calc(1vh + 0.8vw);
    font-weight: bold;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
}
</style>
