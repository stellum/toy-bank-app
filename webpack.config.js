// 여기는 node 환경이라 import 가 아니라 require 로 불러오기
const path = require("path");

const TerserWebpackPlugin = require("terser-webpack-plugin");
// terser html JS코드를 난독화 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// CssMinimizerPlugin = CSS 파일 크기 최적화
const CopyPlugin = require("copy-webpack-plugin");
// static 폴더 내용이 dist 에 카피되는 플러그인

module.exports = {
  entry: "./src/js/index.js", // 빌드 진입점
  output: {
    filename: "index.js", // 빌드 됐을때 파일이름
    path: path.resolve(__dirname, "./dist"), // __dirname : 현재 파일이 있는 경로
    clean: true, // 기존에 생성된 불필요한 파일을 제거
  },
  devtool: "source-map",
  mode: "development",
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // 이 확장자로 아래 CSS 파일을 쓰겠다
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Toy-Project", // HTML 웹 타이틀
      template: "./index.html",
      inject: "body", // JS script tag를 어디에 넣을건지
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: __dirname + "/src/static",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devServer: {
    host: "localhost",
    port: 8080,
    open: true, // true 로 하면 브라우저가 자동으로 열린다
    watchFiles: "index.html", // index.html 이 수정되면 자동으로 업데이트
  },
};
