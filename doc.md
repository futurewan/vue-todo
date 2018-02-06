### webpack插件

## cross-env
在不同系统环境下设置变量

## webpack-dev-server
开发环境用于调试报错信息等,生成一个开发用的服务器，在文件有变化的时候自动给我们打包，然后刷新页面 .. 它还有个模块热替换的功能 .. 就是它可以只替换有变化的地方 .. 不需要刷新整个页面 ... 

## url-loader
处理小于2k的图片，转换成base64位流文件

## postcss
后处理css文件，对css文件做语法分析，真正的核心操作，依赖于postcss庞大的插件群体
https://github.com/postcss/postcss/blob/master/docs/plugins.md
比如css的语法验证，压缩，支持变量和混入语法

## extract-text-webpack-plugin
单独导出css文件

### 数据绑定
原来的实现方式：如果要让object对象的数据显示到html中需要js对DOM进行操作
问题在于对DOM操作成本是很大的（浏览器的渲染），并且当用户操作后，数据会变化，后续如果需要发送给后端，就需要取出dom数据，其实这样是不利于数据管理的（同时存在于view层和model层）
数据绑定实现方式：object.defineProperty的get和set方法进行数据推送
数据绑定的实现解决了上述问题


## 组建化开发

## render方法（虚拟DOM）
组件里有任何数据变化时，都会冲洗执行render方法，产生新的html，更新内容
template转换成vue中的render方法，render方法会用createElement方法生成DOM然后插入进html中


### api重点
## 生命周期方法

## computed
vue是reative的框架，声明好的数据会影响到依赖于该数据的template


### 生产环境优化
类库代码单独打包，缓存


