// 引入一个包
const path = require("path");
// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入 clean 插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack 中所有的配置信息都应该写在 module.exports 中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在的目录
  output: {
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的名字
    filename: "bundle.js",
    // 告诉 webpack 不使用箭头函数，防止 无法解析 ie
    environment: {
      arrowFunction: false,
      const: false,
    },
  },

  // 指定 webpack 打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的 loader
        use: [
          // 配置 babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置 babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 指定 corejs 的版本
                    corejs: "3",
                    // 使用 corejs 的方法 "usage" 表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node_modules/,
      },

      // 设置 less 文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入 postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  // 配置 webpack 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "这是一个自定义的 title",
      template: "./src/index.html",
    }),
  ],

  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },

  mode: "production",
};
