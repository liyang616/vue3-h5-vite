<template>
  <div>
    <div class="language fixed" @click="showArea = true">
      <span>{{ languageName }}</span>
      <van-icon name="arrow-down" />
    </div>
    <van-popup v-model:show="showArea" :style="{ height: '36%' }" closeable close-icon="close" round position="bottom">
      <div class="languageList">
        <div :class="languageName == item.name ? 'item cur' : 'item'" v-for="item in languageList" @click="languageClick(item.value)">
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { languageList } from '@/i18n/language'
// i18n语言切换
import { useI18n } from 'vue-i18n'
const { locale, t: $t } = useI18n()
// vant语言切换
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
// import arSA from 'vant/es/locale/lang/ar-SA'
// import frFR from 'vant/es/locale/lang/fr-FR'
// import esES from 'vant/es/locale/lang/es-ES'
// import ptBR from 'vant/es/locale/lang/pt-BR'

const showArea = ref<boolean>(false)
const languageName = ref<string>('')
const setLanguage = () => {
  const curLanguage = localStorage.getItem('language') || 'en-US'
  languageName.value = languageList[curLanguage].name
  locale.value = curLanguage
  if (curLanguage) {
    if (curLanguage == 'en-US') Locale.use(curLanguage, enUS)
    if (curLanguage == 'zh-CN') Locale.use(curLanguage, zhCN)
    // if (curLanguage == 'ar-SA') Locale.use(curLanguage, arSA)
    // if (curLanguage == 'fr-FR') Locale.use(curLanguage, frFR)
    // if (curLanguage == 'es-ES') Locale.use(curLanguage, esES)
    // if (curLanguage == 'pt-BR') Locale.use(curLanguage, ptBR)
  }
}
setLanguage()
const route = useRoute()
const i18nKey: any = route.meta.i18nKey
const languageClick = (val: string) => {
  localStorage.setItem('language', val)
  setLanguage()
  showArea.value = false
  document.title = $t(i18nKey)
  // location.reload()
}
</script>
<style lang="scss" scoped>
.language {
  position: absolute;
  top: 10px;
  left: 50%;
  width: 220px;
  transform: translateX(55%);
  text-align: right;
  font-size: 30px;
  padding: 26px 20px;
  z-index: 1111;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &.fixed {
    position: fixed;
    top: 10px;
    transform: translateX(70%);
  }
  .icon {
    font-size: 20px;
    transform: rotate(90deg);
  }
  span {
    margin-right: 10px;
  }
}
.languageList {
  padding: 60px 40px;
  .item {
    display: flex;
    align-items: center;
    font-size: 30px;
    padding: 20px 0;
    color: #aaa5a5;
    &.cur {
      color: #111;
    }
  }
}
</style>
