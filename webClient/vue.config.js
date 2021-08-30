const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  parallel: false,
  outputDir: process.env.NODE_ENV!=='production'?'./dist':'./bin-release',
  assetsDir: "./nover",
  publicPath: '',
  css:{extract:false},
  configureWebpack: config=>{
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[name].js';

    config.devtool = process.env.NODE_ENV!=='production'?'source-map':undefined;
    
    if( process.env.UI_TP=="app" ){
      config.entry.app = './src/appUI/index.ts'
    }
    else{
      config.entry.app = './src/elUI/index.ts'
    }
  },
  chainWebpack: config => {
    // config.plugin('html')
    //   .tap(args => {
    //     args[0].title= 'webapp'
    //     return args
    //   });
    config.plugin('define')
      .tap(args => { 
          args[0].__DEV__ = JSON.stringify(process.env.NODE_ENV!=='production');
          return args
      });
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      });
  }
};