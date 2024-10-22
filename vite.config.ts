import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import path from 'path'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'
const resolve = (dir: any) => path.join(__dirname, dir)

// 语言
import { updateLanguage } from './viteConfig/language';
updateLanguage('viteConfig/assets/language.xlsx', 'src/i18n/language/data.json');

export default ({ mode }: any) => {
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()]
      }),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      postcss: {
        plugins: [
          // 配置 autoprefixer
          autoprefixer({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
            grid: true
          }),
          postcssPxtorem({
            rootValue({ file }: any) {
              // 如果是 Vant 的样式就按照 37.5 处理转换
              // 如果是我们自己的样式就按照 75 处理转换
              return file.indexOf('vant') !== -1 ? 37.5 : 75
              // 这样做的好处是当拿到width为750px的设计稿是其中的内容width是
              // 多少就直接写多少即可，不用除以2了
            },
            selectorBlackList: ['#app', 'html'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_URL, // 目标服务器地址
          changeOrigin: true, // 是否改变源地址
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
