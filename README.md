# vue-cli-plugin-preset-tpl

[![NPM version](https://img.shields.io/npm/v/vue-cli-plugin-preset-tpl.svg?style=flat-square)](https://www.npmjs.com/package/vue-cli-plugin-preset-tpl) [![GitHub forks](https://img.shields.io/github/forks/vxhly/vue-cli-plugin-preset-tpl.svg)](https://github.com/vxhly/vue-cli-plugin-preset-tpl/network) [![GitHub stars](https://img.shields.io/github/stars/vxhly/vue-cli-plugin-preset-tpl.svg)](https://github.com/vxhly/vue-cli-plugin-preset-tpl/stargazers) [![NPM download](https://img.shields.io/npm/dm/vue-cli-plugin-preset-tpl.svg?style=flat-square)](https://npmjs.org/package/vue-cli-plugin-preset-tpl) [![GitHub license](https://img.shields.io/github/license/vxhly/vue-cli-plugin-preset-tpl.svg)](https://github.com/vxhly/vue-cli-plugin-preset-tpl/blob/master/LICENSE)

> 基于 VUE CLI 3 的自定义预设模板

## 特性

脚手架默认开启如下功能

- sass 处理器（node-sass）
- vue-router（hash 模式）
- vuex
- axios
- mockjs
- ElementUI
- [git commit 规范](https://vxhly.github.io/archives/fdd4f330.html)
- 构建时开启 gzip 压缩

可配置添加功能模块

- lodash
- moment

## preset.json

```json
{
  "useConfigFiles": true,
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "standard",
      "lintOn": [
        "save",
        "commit"
      ]
    },
    "vue-cli-plugin-element": {
      "prompts": true
    },
    "vue-cli-plugin-preset-tpl": {}
  },
  "router": true,
  "routerHistoryMode": false,
  "vuex": true,
  "cssPreprocessor": "node-sass"
}
```

## 安装使用

使用 vue-cli 3.0 常规创建一个项目

```bash
vue create my-app
cd my-app
vue add preset-tpl
```

或者可以直接这样安装（推荐）

```bash
vue create --preset vxhly/vue-cli-plugin-preset-tpl my-app
```

## 目录结构

```bash
│  vue.config.js
│
└─src
    │  App.vue
    │  main.js
    │
    ├─api
    │      axios.js
    │      errorMessage.js
    │      index.js
    │
    ├─assets
    │  │  logo.png
    │  │
    │  └─styles
    │      └─public
    │              common.scss
    │              public.scss
    │              reset.scss
    │
    ├─mock
    │      index.js
    │
    ├─router
    │      index.js
    │
    └─store
        │  index.js
        │
        ├─modules
        │      example.js
        │      index.js
        │
        └─types
                example-types.js
```

## 其他

> 灵感来源1 => [vue-cli-plugin-custom-tpl](https://github.com/natee/vue-cli-plugin-custom-tpl)
> 灵感来源2 => [vue-cli-plugin-element](https://github.com/ElementUI/vue-cli-plugin-element)
> 灵感来源3 => [vue-cli-plugin-ant-design](https://github.com/vueComponent/vue-cli-plugin-ant-design)