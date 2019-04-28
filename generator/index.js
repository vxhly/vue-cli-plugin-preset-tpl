module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    'dependencies': {
      '@babel/polyfill': '^7.4.3',
      'axios': '^0.18.0',
      'mockjs': '^1.0.1-beta3',
      'vue-echarts': '^4.0.1'
    },
    'devDependencies': {
      'cz-conventional-changelog': '^2.1.0',
      'compression-webpack-plugin': '^2.0.0',
    },
    'scripts': {
      'changelog': 'conventional-changelog -p angular -i src/CHANGELOG.md -s -r 0'
    },
    'config': {
      'commitizen': {
        'path': './node_modules/cz-conventional-changelog'
      }
    }
  })

  if (options.lodash) {
    api.extendPackage({
      'dependencies': {
        'lodash': '^4.17.11',
      }
    })
  }

  if (options.moment) {
    api.extendPackage({
      'dependencies': {
        'moment': '^2.24.0',
      }
    })
  }

  if (options.replaceTemplates) {
    const filesToDelete = [
      'src/router.js',
      'src/store.js'
    ]

    api.render(files => {
      Object.keys(files)
        .filter(name => filesToDelete.indexOf(name) > -1)
        .forEach(name => delete files[name])
    })

    api.render('./templates')
  }

}