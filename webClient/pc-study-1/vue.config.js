module.exports = 
{
    devServer:
    {
        port:8183,
        proxy: 
        {
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://127.0.0.1:3004/',  
                changeOrigin: true, // 必须加上这个才能跨域请求
                pathRewrite:  // 重命名
                { 
                    ['^' + process.env.VUE_APP_BASE_API] : ''
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
      }
    }
}
