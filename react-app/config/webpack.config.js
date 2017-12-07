var webpack = require('webpack');
var path = require('path');

// ../ works as well
var APP_DIR = path.resolve(__dirname, '../src');
 

var config = {
  
  entry: {
    app: APP_DIR + '/main.js',
  }, 

  //no need for path attribute in output
  //all bundle files created in memory in webpack
  output: {
    publicPath: '/',
    filename: "app.bundle.js"
  },
 
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loaders: [ "babel-loader"]
      },
    ]
  },
 
  //debug, es6 to es5 mapping
  devtool: 'source-map',

  plugins: [

  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks:  function(module, count) {
          var context = module.context;
          return context && context.indexOf('node_modules') >= 0;
      },
  }),

  ],

  devServer: {
    contentBase: APP_DIR,
    //port: 8080,

    //for supporting history api fallback
     historyApiFallback: {
       index: '/'
     }
  }

};

module.exports = config;