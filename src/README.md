**前序准备**

本地环境需要安装 node、yarn 和 git。我们的技术栈基于 Typescript、Vue、Webpack、postcss 和 weex

**目录结构**

mall-project 是一个标准的 VUE CLI 构建的项目，并提供了涵盖中开发的各类功能和多端需求，下面是整个项目的目录结构。

```
┌─components            组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录，详见
├─platforms             存放各平台专用页面的目录，详见
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─wxcomponents          存放小程序组件的目录，详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
```

**环境安装**

全局安装vue-cli

```
npm install -g @vue/cli
```

创建i-app

```
vue create -p dcloudio/uni-preset-vue my-project
```

my-project为项目文件

**克隆代码**

```
git clone https://github.com/leoxiaoge/mall-project
```

安装 推荐使用 yarn 或者 yarn start 或者 npm install

注：使用CLI安装，是一个干净的脚手架；使用克隆代码会包含所有示例。

安装 ts-md5

```
npm install ts-md5 --save
```

安装 sass-loader

```
npm install node-sass --save-dev

npm install sass-loader --save-dev
```
在需要使用的component或者service中 import

import {Md5} from 'ts-md5/dist/md5';


使用Md5中的 hashStr方法

源码

static hashStr(str: string, raw?: boolean): Int32Array | string;

比如

let password:string = '123123';

Md5.hashStr(password);

结果 ： 4297f44b13955235245b2497399d7a93

使用微信支付

一.NPM安装方式

```
npm install jweixin-module --save
```

二.下载使用方式

下载地址：https://unpkg.com/jweixin-module@1.4.1/out/index.js

JS-SDK说明文档

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

运行项目 推荐使用 yarn serve 或者 npm run dev:h5

**运行并发布**

npm run dev:%PLATFORM%

npm run build:%PLATFORM%

%PLATFORM% 可取值如下:

|名称| 平台|
| :----- | :----- |
|h5|h5|
|mp-alipay|支付宝小程序|
|mp-baidu|百度小程序|
|mp-weixin|微信小程序|
|mp-toutiao|头条小程序|

例如： 

H5运行并发布： npm run dev:h5    npm run build:h5

微信小程序运行并发布： npm run build:mp-weixin
      
**备注：**

dev 模式编译出的各平台代码存放于根目录下的 /dist/dev/目录，打开各平台开发工具选择对应平台目录即可进行预览（h5 平台不会在此目录，存在于缓存中）；

build 模式编译出的各平台代码存放于根目录下的 /dist/build/ 目录，发布时选择此目录进行发布；

dev 和 build 模式的区别：

    1.dev 模式有 SourceMap 可以方便的进行断点调试；
    
    2.build 模式会将代码进行压缩，体积更小更适合发布为正式版应用；
    
    3.进行 环境判断 时，dev 模式 process.env.NODE_ENV 的值为 development，build 模式 process.env.NODE_ENV 的值为 production。
    
