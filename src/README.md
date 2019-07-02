
环境安装

全局安装vue-cli

npm install -g @vue/cli

创建i-app

vue create -p dcloudio/uni-preset-vue my-project

my-project为项目文件

小程序项目

git clone https://github.com/leoxiaoge/mall-project

安装 推荐使用 yarn 或者 yarn start 或者 npm install

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

运行项目 推荐使用 yarn serve 或者 npm run dev:h5

运行并发布

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
      
备注： 

dev 模式编译出的各平台代码存放于根目录下的 /dist/dev/目录，打开各平台开发工具选择对应平台目录即可进行预览（h5 平台不会在此目录，存在于缓存中）；

build 模式编译出的各平台代码存放于根目录下的 /dist/build/ 目录，发布时选择此目录进行发布；

dev 和 build 模式的区别：

    1.dev 模式有 SourceMap 可以方便的进行断点调试；
    
    2.build 模式会将代码进行压缩，体积更小更适合发布为正式版应用；
    
    3.进行 环境判断 时，dev 模式 process.env.NODE_ENV 的值为 development，build 模式 process.env.NODE_ENV 的值为 production。
    
