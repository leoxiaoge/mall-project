# mall-project
mall = 微信小程序用户前端 + Vue移动端
项目说明：

微信小程序：实现一个多端移动端项目

目录结构：

images — 存放项目图片

pages — 存放项目页面相关文件

style — 存放独立wxss样式文件，可import引入

utils — 存放utils文件，可require引入

运行并发布uni-app

npm run dev:%PLATFORM%
npm run build:%PLATFORM%
%PLATFORM% 可取值如下：

值	平台
h5	H5
mp-alipay	支付宝小程序
mp-baidu	百度小程序
mp-weixin	微信小程序
mp-toutiao	头条小程序
