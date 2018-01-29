const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// process.env 在启动时设置的变量保存在次对象里
/*
webpack作为一个把html、css、js、图片等文件进行打包
 1、合并js、css文件
 2、压缩js、css、html文件
 3、处理图片文件为base64
*/

const config = {
    target: 'web', //在浏览器端
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ //用use可以同时使用多个插件处理文件
                    'style-loader', //css代码放入js代码里再加入到html里
                    'css-loader' //读取css文件里
                ]
            },
            
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [{ // 使用对象可以对插件的参数进行配置
                    loader: 'url-loader', //图片转换base64代码，封装file-loader
                    options: {
                        limit: 2048,
                        name: '[name].[ext]' //文件名加后缀
                    }
                }]
            }
        ]
    },
    //process.env.NODE_ENV 访问
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"' //可以在js代码中访问此变量，开发环境会有报错注释
            }
        }),
        new HTMLPlugin()
    ]
}
if (isDev) {
    config.module.rules.push({
        test: /\.less$/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    souceMap:true //生成自己的souceMap 用less-loader的souceMap
                }
            },
            'less-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-souce-map' //方便开发环境调试
    config.devServer = {
        port: 8000,
        host: '0.0.0.0', //可以通过ip访问
        overlay: {
            error: true, //出现错误显示在网页上
            
        },
        hot:true,
        // historyFallback:{ 路由

        // },
        open:true
    },
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(), //热加载
        new webpack.NoEmitOnErrorsPlugin()  //减少不要的信息
    )
} else{
    config.output.filename = '[name].[chunkhash:8].js'; //chunkhash 只可用于生产环境
    config.module.rules.push({
        test: /\.less$/,
        use:ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        souceMap:true //生成自己的souceMap 用less-loader的souceMap
                    }
                },
                'less-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractTextPlugin('style.[contentHash:8].css')
    )
}


module.exports = config;