import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const globby = require('globby');
const fs = require('fs');
const glup = require('gulp')

function fn() {
  const fileList = globby.sync('public/assets/*.(png|jpg)').map(item => item.replace('public/', ''))
  console.info(fileList)

  const enumList = fileList.map(item => {
    const key = item.replace('assets/', '').replace(/\.(jpg|png)$/, "")
    return `'${key}' = '${item}'`
  }).join(',\n')
  fs.writeFileSync('src/COMMON.ts', `
export const COMMON_TEXTURE_LIST = ${JSON.stringify(fileList, null, 2)}

export enum COMMON_TEXTURE {
  ${enumList}
}
    `)
}

glup.watch('./public/assets/*.(png|jpg)', fn)
fn()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
