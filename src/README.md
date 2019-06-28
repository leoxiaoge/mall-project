

小程序项目
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
