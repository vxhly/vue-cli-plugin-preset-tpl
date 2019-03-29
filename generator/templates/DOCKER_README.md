# docker 使用

在项目文件夹下创建 `dockerfile`

```Dockerfile
FROM node:latest

# system local config
RUN true \
    # debian china mirrors
    && sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list \
    && sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list \
    # timezone to china
    && ln -sf /usr/share/zoneinfo/PRC /etc/localtime 

RUN apt-get update \
    && apt-get install -y \
    # node-sass 等编译依赖
    make gcc g++ python2.7 \
    # 命令行工具
    zsh curl wget vim git git-flow yarn xsel

# 切换 node 的软件版本源 => 切源工具 cgr 和 nrm
# cgr 是基于nrm的改进版本，进行了一些优化，能同时管理 npm、yarn 源
# cgr use taobao n => 只是切换 npm 源
# cgr use taobao y => 只是切换 yarn 源
RUN true \
    && npm install -g cgr nrm \
    && cgr use taobao \
    && yarn global add serve @vue/cli @vue/cli-service-global \
                commitizen conventional-changelog-cli eslint-plugin-vue \
                npm-check-updates npx \
    && npm i -g serve @vue/cli @vue/cli-service-global \
                commitizen conventional-changelog-cli eslint-plugin-vue \
                npm-check-updates npx 

# 创建工作目录
RUN mkdir /workspace

WORKDIR /workspace

# 添加权限，755 或者 a+x
RUN chmod -R 755 /workspace

VOLUME /workspace

EXPOSE 8080  
EXPOSE 5000

CMD ["zsh"]
```

在项目文件夹下创建 `docker-compose.yml`

```YAML
version: '3'
services:
  dev:
    image: vueimage:1.0
    ports:
     - "8080:8080" # 映射端口，将本机的 8080 端口映射到 docker 的 8080 端口,npm run serve
    restart: always # 每次开启 docker 的时候重启服务，适用于 MySQL、nginx 类似于这种的服务
    volumes: 
     - ./:/workspace # 将执行命令的目录映射到 docker 容器的 /workspace 目录
    stdin_open: true # 命令行输入映射，不进行设置会导致无法正常进入 docker
    tty: true # 使用TTY模式（pseudo-TTY）。若要使用Bash，则必须设置该选项。若不设置该选项，则可以输入命令，但不显示shell
  web:
    image: vueimage:1.0
    ports:
    - "5000:5000" # 映射端口，将本机的 5000 端口映射到 docker 的 5000 端口,npm run build && serve dist\
    restart: always # 每次开启 docker 的时候重启服务，适用于 MySQL、nginx 类似于这种的服务
    volumes: 
    - ./:/workspace # 将执行命令的目录映射到 docker 容器的 /workspace 目录
    stdin_open: true # 命令行输入映射，不进行设置会导致无法正常进入 docker
    tty: true # 使用TTY模式（pseudo-TTY）。若要使用Bash，则必须设置该选项。若不设置该选项，则可以输入命令，但不显示shell
```

在项目文件夹下执行(编译一个镜像容器出来)

```Bash
docker build -t vueimage:1.0 .
```

编译完成之后执行,用以启动容器

```Bash
docker-compose up -d
```

使用 `docker ps` 查看 容器的 id，之后使用以下命令进入容器

```Bash
docker exec -it [docker_id] zsh
```

确认当前目录已经挂载了当前的项目目录，使用 `pwd` 确认当前的目录为 `/workspace`,执行安装依赖命令并且启动服务

```Bash
yarn install
yarn serve
```

服务启动之后就在浏览器中访问 `http://127.0.0.1:8080`

经过上面的配置，我们就可以在主机上使用喜欢的编辑器编辑代码，通过docker执行。但是使用 `yarn serve` 命令进行开发时，会发现一个问题：在编辑器中编辑文件后，docker无法监听到文件的修改，从而重新编译、刷新页面；我们可以采用 webpack 的轮询功能解决：

> 关于 webpack 的轮询功能 => [webpack](https://www.webpackjs.com/configuration/watch/)

`vue.config.js`

```javascript
module.exports = {
  devServer: {
    watchOptions: {
      aggregateTimeout: 300, // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
      poll: 1000 // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    }
  }
}

```

到此已经全部配置完毕，重新 `yarn serve` 然后就可以愉快的写代码了

# git commit

现在由于我们在 docker 内部安装项目依赖，也就是说我们当前的环境变成了 liunx，相关的依赖包也就是 liunx 的依赖包，所以在 windows 环境下执行 `git commit` 的时候会报依赖找不到，那是因为安装了 liunx 的依赖包，两个平台的安装包是不一样的

那么在 docker 下执行 `git commit` 的时候又会失败，因为 commit 的时候 git 需要知道当前的 commit 作者是谁，这时候不必全局配置 commit 的 config 信息，只需在项目目录下执行

```bash
git config   user.name 'XXX'
git config   user.email 'XXX' 
# or
git config  --local  user.name 'XXX' 
git config  --local user.email 'XXX' 
```

设置完用 `git config --list` 进行检验，之后的 commit 操作就在 docker 容器下执行就行了

# 拓展

## CSS预处理SASS的默认实现将迁移到 Dart Sass

Web开发中流行的CSS预处理 - Sass 14，于2016年11月1日在博客正式对外公布了alpha版本的Dart Sass 32项目，即他们使用Dart对Sass进行了重写。对于这次迁移/重写，Sass项目组做了以下说明：

> 关于 [github:dart-sass](https://github.com/sass/dart-sass) [dart-sass](https://sass-lang.com/dart-sass)

因为使用 `node-sass` 无论是在 Windows 环境下还是在 docker 的 liunx 环境下都需要依赖 `gcc` 和 `python2.7`，有的时候会出现编译错误（指的是在执行 `npm install` 安装 `node-sass` 的时候由于部分库不齐备或者是编译原因导致 `node-sass` 无法正常安装），所以使用 `dart-sass` 来代替 `node-sass` 是个不错的选择，至少目前在自测中是没有出现编译问题的，至于兼容性问题，GitHub 文档中也给出承诺 [Browser Compatibility](https://github.com/sass/dart-sass#browser-compatibility)

### 为什么重写Sass？

Sass 的主要实现有 Ruby Sass 7 和 LibSass 10（node-sass 底层使用的是 LibSass），它们都有各自的优缺点。Ruby Sass 的实现语言是高级语言 Ruby，更容易迭代，但存在运行速度慢，不易安装的缺点。LibSass 虽然速度快，但它的开发语言是 C/C++，迭代速度慢，无法快速地添加各种功能。

### 为什么使用Dart？

Dart 的运行速度是真的快，对于大型样式文件，Dart Sass 的处理速度是 Ruby Sass 的5~10 倍，且只比 LibSass 慢 1.5 倍左右。同时，Dart 是一门具备静态类型的动态语言，对比 C/C++ 甚至是 Ruby，Dart 相对更容易上手且代码也更易于编写和维护。此外，Dart 具备编译输出为 JavaScript 的能力，使得 Dart Sass 可以兼容 NodeJS 平台。

### 各种实现的后续规划？

LibSass  作为目前性能最好的 Sass 实现，后续将继续维护，只是它不再需要背负快速添加各种新功能的压力。Ruby Sass 目前也会同步维护，但在无人接手的情况下，它将逐渐边缘化。Sass项目组后续主要精力将转移到 Dart Sass，其稳定版本预计在 2017 年初放出。