const path = require("path")
const join = path.join

module.exports = {
  output: {
    path: join(__dirname, "../public/assets"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    modules: [join(__dirname, "../node_modules"), join(__dirname, "../src")]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader:"babel-loader",
          options: {
            "babelrc": false,
            "presets": [
              [
                "@babel/env",
                {
                  "targets": {
                    "node": "6.10"
                  }
                }
              ],
              "@babel/preset-react",
              "@babel/preset-stage-2",
              "@babel/preset-typescript"
            ],
            "plugins": [
              "universal-import"
            ]
          }
        }
      }, {
        test: /\.js$/,
        use: {
          loader:"babel-loader",
          options: {
            "babelrc": false,
            "presets": [
              [
                "@babel/env",
                {
                  "targets": {
                    "browsers": "last 2 versions"
                  }
                }
              ],
              "@babel/react",
              "@babel/preset-stage-2"
            ],
            "plugins": [
              "universal-import"
            ]
          }
        }
      }
    ]
  },
}
