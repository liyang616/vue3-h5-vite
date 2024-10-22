import { App } from 'vue'
import http from '@/utils/request'

const Api = {
  getData(params: any) {
    return http.request({
      url: '/home/weather',
      method: 'get',
      params
    })
  }
};

export const ApiPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$api = Api;
  }
}