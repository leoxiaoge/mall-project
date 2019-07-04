#前序准备

本地环境需要安装 node、yarn 和 git。我们的技术栈基于 Typescript、vue、webpack、postcss 和 uni-app

#环境安装

全局安装vue-cli

npm install -g @vue/cli

创建i-app

vue create -p dcloudio/uni-preset-vue my-project

my-project为项目文件

#克隆代码

git clone https://github.com/leoxiaoge/mall-project

安装 推荐使用 yarn 或者 yarn start 或者 npm install

注：使用CLI安装，是一个干净的脚手架；使用克隆代码会包含所有示例。

安装 ts-md5

npm install ts-md5 --save

在需要使用的component或者service中 import

import {Md5} from 'ts-md5/dist/md5';


使用Md5中的 hashStr方法

源码

static hashStr(str: string, raw?: boolean): Int32Array | string;

比如

let password:string = '123123';

Md5.hashStr(password);

结果 ： 4297f44b13955235245b2497399d7a93

#目录结构
NG-ALAIN 是一个标准的 Angular CLI 构建的项目，并提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

├── _mock                                       # Mock 数据规则
├── src
│   ├── app
│   │   ├── core                                # 核心模块
│   │   │   ├── i18n
│   │   │   ├── net
│   │   │   │   └── default.interceptor.ts      # 默认HTTP拦截器
│   │   │   ├── services
│   │   │   │   └── startup.service.ts          # 初始化项目配置
│   │   │   └── core.module.ts                  # 核心模块文件
│   │   ├── layout                              # 通用布局
│   │   ├── routes
│   │   │   ├── **                              # 业务目录
│   │   │   ├── routes.module.ts                # 业务路由模块
│   │   │   └── routes-routing.module.ts        # 业务路由注册口
│   │   ├── shared                              # 共享模块
│   │   │   └── shared.module.ts                # 共享模块文件
│   │   ├── app.component.ts                    # 根组件
│   │   └── app.module.ts                       # 根模块
│   │   └── delon.module.ts                     # @delon模块导入
│   ├── assets                                  # 本地静态资源
│   ├── environments                            # 环境变量配置
│   ├── styles                                  # 样式目录
└── └── style.less                              # 样式引导入口

运行项目 推荐使用 yarn serve 或者 npm run dev:h5

#运行并发布

npm run dev:%PLATFORM%

npm run build:%PLATFORM%

%PLATFORM% 可取值如下:

值	平台

h5	H5
mp-alipay	支付宝小程序

mp-baidu	百度小程序

mp-weixin	微信小程序

mp-toutiao	头条小程序

例如： H5运行并发布： npm run dev:h5      npm run build:h5

      微信小程序运行并发布： npm run build:mp-weixin
      
#备注： 

dev 模式编译出的各平台代码存放于根目录下的 /dist/dev/目录，打开各平台开发工具选择对应平台目录即可进行预览（h5 平台不会在此目录，存在于缓存中）；

build 模式编译出的各平台代码存放于根目录下的 /dist/build/ 目录，发布时选择此目录进行发布；

dev 和 build 模式的区别：

    1.dev 模式有 SourceMap 可以方便的进行断点调试；
    
    2.build 模式会将代码进行压缩，体积更小更适合发布为正式版应用；
    
    3.进行 环境判断 时，dev 模式 process.env.NODE_ENV 的值为 development，build 模式 process.env.NODE_ENV 的值为 production。
    
