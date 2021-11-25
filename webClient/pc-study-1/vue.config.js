const externals = {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    "element-ui": "ELEMENT"
  }

module.exports = 
{
  lintOnSave:"default",
    devServer:
    {
        port:8183,
        proxy: 
        {
            '/api': {
                target: `http://127.0.0.1:3002/`,  
                changeOrigin: true, // 必须加上这个才能跨域请求
                pathRewrite:  // 重命名
                { 
                    '^/api': ''
                }
            }
        }
    },

    pluginOptions: {
      i18n: {
        locale: 'zh',
        fallbackLocale: 'en',
        localeDir: 'src',
        enableLegacy: true,
        runtimeOnly: false,
        compositionOnly: true,
        fullInstall: true
      },
    },
    

    configureWebpack:{
        optimization: {
            splitChunks: {
              cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]@?(vue|vant|vue-rooter|vue-game|element-plus|vue-class-component)[\\/]/,
                    name: "mo-vendors",
                    chunks: "all"
                }
              }
            }
        }
    },

    chainWebpack:config=>{
      console.log("config....." + JSON.stringify(process.env.NODE_ENV !== 'production'));
      config.plugin("define")
      .tap(args=>{
        args[0].__DEV__ = JSON.stringify(process.env.NODE_ENV !== 'production');
        console.log(JSON.stringify(args[0]));
        return args
      })
    }

    // module:{
    //     rules:[
    //         {
    //             test: /\.js$/,
    //             //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
    //             loader: 'happypack/loader?id=happyBabel',
    //             //排除node_modules 目录下的文件
    //             exclude: /node_modules/
    //         }
    //     ]
    // }
}
