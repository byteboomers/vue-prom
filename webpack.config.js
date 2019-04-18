const path = require("path");

module.exports = {
  entry: path.resolve(__dirname + "/src/VueProm.vue"),
  output: {
    path: path.resolve(__dirname + "/dist/"),
    filename: "vue-prom.js",
    library: "vue-prom",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  }
};
