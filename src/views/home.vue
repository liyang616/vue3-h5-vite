<template>
  <div class="home">
    <div class="h1">vite-h5</div>
    <Language />
    <div class="h2">{{ $t('router.Home') }}</div>
    <img alt="Vue logo" src="../assets/vue.svg" />
    <van-button type="primary" class="a">{{ weather }}</van-button>
    <van-button icon="plus" type="primary">按钮</van-button>

    <div class="p">---pinia简易示例start---</div>
    <Counter />
    <div class="p">---pinia简易示例end---</div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'home'
})

let weather = ref<string>('')
proxy.$api.getData().then((res: any) => {
  if (res.status) return
  weather.value = res.data.weather
})
</script>

<style lang="scss" scoped>
.h1 {
  font-weight: bold;
  font-size: 100px;
}
.h2 {
  margin: 60px 0;
  font-weight: bold;
  font-size: 60px;
}
.p {
  margin: 60px 0;
  font-size: 60px;
}
.a {
  margin-right: 20px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 40px;
  line-height: 200px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
