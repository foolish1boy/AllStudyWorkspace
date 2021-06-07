module.exports = 
{
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
      }
    }
}
