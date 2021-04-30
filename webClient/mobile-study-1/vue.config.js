const path = require('path')

function resolve(dir) {
  let p = path.join(__dirname, dir);
  console.log("P:" + p);
  return p;
}

module.exports = 
{
    devServer: 
    {
      port:8182,
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
    },
    chainWebpack: config=>{
      const svgRule = config.module.rule('svg'); // 找到svg-loader
      svgRule.uses.clear();  // 清除已有的loader, 如果不这样做会添加在此loader之后
      svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
      svgRule // 添加svg新的loader处理
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        });

        // 修改images loader 添加svg处理
      const imagesRule = config.module.rule('images')
      imagesRule.exclude.add(resolve('src/icons'))
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      }
}