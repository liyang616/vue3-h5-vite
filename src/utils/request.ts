import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

class HttpRequest {
  private readonly baseUrl: string
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl, // 所有的请求地址前缀部分(没有后端请求不用写)
      timeout: 80000 // 请求超时时间(毫秒)
      // withCredentials: true,// 跨域请求时发送cookies
      // headers: {
      // 设置后端需要的传参类型
      // 'Content-Type': 'application/json',
      // 'token': x-auth-token',//一开始就要token
      // 'X-Requested-With': 'XMLHttpRequest',
      // },
    }
    return config
  }

  // 请求拦截
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    instance.interceptors.request.use(
      (config) => {
        // 请求头携带token
        const token: string | undefined = Cookies.get('webtoken')
        if (token) {
          config.headers['webtoken'] = 'Bearer ' + token
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    //响应拦截
    instance.interceptors.response.use(
      (res) => {
        //返回数据
        const { data } = res
        // 登录失效
        if (data.status == 2001) {
          showToast('登录失效，请重新登入')
          location.reload()
          return
        }

        // 业务code
        if (data.status != 0) {
          // 业务异常
          showToast(data.message || 'Error')
          return
        }
        return data
      },
      (error: any) => {
        if (error.statusCode == 401) {
          // 无权限，去401页面
          router.push('/401')
        } else if (error.statusCode == 404) {
          // 404页面
          router.push('/404')
        } else {
          // 其他异常，抛提示信息
          showToast(error.message || 'Error')
        }
        return Promise.reject(error)
      }
    )
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const http = new HttpRequest()
export default http
