var config = require("../webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn');
// var localhost = '127.0.0.1';
localhost = 'localhost';

config.entry.app.unshift("webpack-dev-server/client?http://"+ localhost +":8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'./dist/',
    publicPath: '/assets/',
    proxy: {
      "**": "http://"+ localhost +":8081"
    }
});
server.listen(8080, localhost, function() {
  opn("http://"+ localhost +":8080");
  console.log("listen at 8080");
});