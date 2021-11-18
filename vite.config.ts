import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const globby = require('globby');
const fs = require('fs');
const glup = require('gulp')

function fn(){
    const fileList = globby.sync('public/assets/*.png').map(item=>item.replace('public/', ''))
    console.info(fileList)
    fs.writeFileSync('src/COMMON.ts', `export const COMMON_TEXTURE_LIST = ${JSON.stringify(fileList, null ,2)}`)
}

glup.watch('./public/assets/*.png', fn)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
