const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css', 'html', 'png', 'jpg', 'gif', 'svg', 'jpeg']

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/public/public.scss";
        `
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  configureWebpack: config => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
          '@': resolve('./src/'),
          '@c': resolve('./src/components/')
        }
      }
    })

    const myConfig = {}
    // 配置 Gzip 压缩
    if (process.env.NODE_ENV === 'production') {
      myConfig.plugins = []

      // 构建时开启 gzip，降低服务器压缩对 CPU 资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
    }

    return myConfig
  }
}
