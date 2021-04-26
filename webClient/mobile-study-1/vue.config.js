module.exports = 
{
    devServer: 
    {
      port:8082,
      proxy: 
      {
          '/api': {
            target: 'http://127.0.0.1:3004/',  
            changeOrigin: true, // 必须加上这个才能跨域请求
            pathRewrite:  // 重命名
            { 
              '^/apis': ''
            }
          }
        }
    },
    configureWebpack:
    {
      devtool: 'source-map',
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
      }
    }
}