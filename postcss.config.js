// PostCSS 配置文件
export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 基准值，
      unitPrecision: 5, // 允许REM单位增长到的十进制数字
      propList: ['*'], // 可以转换的属性
      selectorBlackList: [], // 忽略的选择器
      replace: true,
      mediaQuery: false,
      minPixelValue: 0, // 最小像素值
      exclude: /node_modules/i, // 排除node_modules文件夹
    },
  },
};