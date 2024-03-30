# vue-xinyipurification

使用vue3创建的一个企业网页开源项目，后端使用Django。使用了pinia和router。

## 1. 创建项目

### 1.1. Vue包的安装

这里，我使用的是npm（版本需要大于16.0）包管理器来下载Vue，执行以下命令：

```powershell
> npm install -g vue 
```

如果下载速度较慢也可以使用镜像库或者cnpm下载，`-g`表示全局下载。至于npm包管理器的配置问题，可以参见[该网址](https://blog.csdn.net/ZHANGYANG_1109/article/details/121229581)。

### 1.2. 创建一个新的应用

进入到你想创建Vue项目的目录下，在终端命令行中运行以下命令：

```powershell
> npm create vue@latest
```

这一指令将会安装并执行 [create-vue](https://github.com/vuejs/create-vue)，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示，由于我们需要进行单页面开发，因此下面的选项中选择了 `Vue Router` 、`Viteset`、  `Pinia`、 `ESlint` 以及提供的 `DevTools`：

```sh
√ 请输入项目名称： ... vue-xinyipurification
√ 是否使用 TypeScript 语法？ ... 否 / 是
√ 是否启用 JSX 支持？ ... 否 / 是
√ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / 是
√ 是否引入 Pinia 用于状态管理？ ... 否 / 是
√ 是否引入 Vitest 用于单元测试？ ... 否 / 是
√ 是否要引入一款端到端（End to End）测试工具？ » 不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 否 / 是
√ 是否引入 Prettier 用于代码格式化？ ... 否 / 是
```

如果不确定是否要开启某个功能，你可以直接按下回车键选择 `No`。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

```powershell
> cd <your-project-name>
> npm install  # 如果安装速度过慢，可以选择使用cnpm或者配置npm的下载源
> npm run dev
```

如果一切正常的话你应该现在已经运行起来了你的第一个vue项目，你可以在[本地连接](http://localhost:5173/)中查看生成的结果：

```powershell
  VITE v5.1.6  ready in 604 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Vue DevTools: Open http://localhost:5173/__devtools__/ as a separate window
  ➜  Vue DevTools: Press Alt(⌥)+Shift(⇧)+D in App to toggle the Vue DevTools

  ➜  press h + enter to show help
```

<img src="https://media.xinyipurification.com/images/image-20240312114523215.png" alt="image-20240312114523215" style="zoom: 25%;" />

## 1.3. 推荐的项目编辑器配置

你可以选择[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)。由于我经常使用 `Python` 语言，因此常用编辑器[PyCharm](https://www.jetbrains.com/pycharm/)，这里使用[WebStorm](https://www.jetbrains.com/webstorm/)。Webstorm为 `Vue` 的开发同样提供了丰富的拓展。

## 2. 为项目增添的初始配置

### 2.1. 启用外部访问以及 `https`：

为了能够在不同大小界面上观察页面渲染的效果，通常需要在不同的设备上检验，当然你也可以使用浏览器自带的“设备仿真”来模拟。

```powershell
/* vite.config.js */
...
export default defineConfig({
  ...
  server: {  // 配置开发环境中的服务器，允许外部访问方便在不同设备上调试
    host: true,
    // https: {  // 配置`https`，具体证书可以通过`mkcert`生成
    //   cert: fs.readFileSync("path\to\your\localhost.pem"),
    //   key: fs.readFileSync("path\to\your\localhost-key.pem")
    // }
  },
})
```

**注意：允许外部访问可能允许 `npm` 访问专有网络或公用网络，你可能需要关闭防火墙，这是不安全的。应当尽量避免在公用局域网中使用该配置。**

### 2.2. 配置页面的基础CSS

为了能够更好地区分页面的逻辑结构，我们在项目中 `\src` 下新建以下文件夹：

- `styles`：用于存放基础的CSS和SASS配置文件；
- `utils`：用于存放接口的工具文件；
- `apis`：存放具体的接口；

```powershell
├───apis					// 存放接口函数
├───assets					// 存放静态资源
├───components				// 存放通用组件
├───router					// 配置路由
├───stores					// 配置Pinia状态管理器
├───styles					// 配置styles样式
├───utils					// 后端提供的工具函数
└───views					// 页面渲染组件
```

并将 `main.css` 和 `base.css` 中的文件移到 `styles` 文件夹中（要注意修改 `main.js` 文件中对于样式文件的引用）。修改样式文件的主要内容以匹配项目，同时清空不必要的示例文件，具体见代码文件。

### 2.3. 添加postcss-pxtorem库--响应式策略

#### 2.3.1. postcss-pxtorem简介

为了适应不同屏幕尺寸和设备像素密度，前端开发者们经常需要使用相对单位，例如rem（root em）而非固定单位像素。然而，手动转换单位可能是一项繁琐的任务，即使是有ps2rem编辑器插件等。而 **postcss-pxtorem** 是一个 PostCSS 插件，用于将 px 单位转换为 rem 单位。根元素html中的 `font-size` 大小，将被作为 `1rem` 。

具体来说，若使用固定的单位像素，对于不同的设备由于其屏幕宽度不同，在开发设备中展示良好的组件可能在另一台设备上由于排版一塌糊涂。为此，能够让一个元素的大小与设备的宽度产生一个合适的关联函数是有必要的。然而使用 `@media` 查询来修改可能要修改很多内容，而直接使用rem单位又很不直观。

使用该库要解决的问题是，在编译的时候，将 `px` 单位自动依照 `1rem` 的大小来转换为 `rem` 单位。这样，当我们响应式修改html的 `font-size` 时，元素大小也能够动态修改啦！

#### 2.3.2. 安装postcss-pxtorem

在终端中使用以下命令安装**postcss-pxtorem**：

```powershell
npm install postcss postcss-pxtorem --save-dev
```

> - `--save-dev` 用于安装和管理开发过程中需要的包，这些包在package.json文件中 `devDependencies` 中列出。
> - `--save` 用于安装和管理生产环境中需要的包，这些包在package.json文件中  `dependencies` 中列出。

若安装失败，可以考虑安装版本5.1.1。（我是用cnpm安装的）

#### 2.3.3. 配置postcss-pxtorem

**在 `index.html` 中添加 `font-size` 的动态响应**

在项目的 `index.html` 文件中添加以下JavaScript代码以动态设置1rem的值：

```html
<script>
    // 获取html元素，并设置font-size
    const html = document.querySelector('html');
    html.style.fontSize = (window.innerWidth/1592 * 16) + 'px';
    // console.log(window.innerWidth);
    // 监听窗口大小变化，动态设置font-size
    window.onresize = function () {
        html.style.fontSize = (window.innerWidth/1592 * 16) + 'px';
        // console.log(window.innerWidth);
    }
</script>
```

要注意将1592替换成你开发时的窗口宽度，16替换成为你想要的字体 `font-size` 大小。当然你也可以直接通过媒体查询和vw单位来转换，一种合理的写法是：

```css
html {
    height: 100%;
    font-size: 16Px;
}

@media (max-width: 768px) {
    /* 768px 100vw*/
    /* 16px 100*16/768 = 2.0833333333333335vw */
    html {
        font-size: calc(max(12Px, 2.08333vw));
    }
}
```

**创建配置文件 `postcss.config.js`** 

在项目的根目录下创建一个名为 `postcss.config.js` 并配置库的使用参数

```javascript
export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 基准值
      unitPrecision: 5, // 允许REM单位增长到的十进制数字，如.33333rem
      propList: ['*'], // 要转换的属性列表
      selectorBlackList: [], // 忽略的选择器如"el-"
      replace: true,
      mediaQuery: false,
      minPixelValue: 5, // 小于这个值将不会用rem替换
      exclude: /node_modules/i, // 排除node_modules文件夹
    },
  },
};
```

主要的[参数解释](https://github.com/cuth/postcss-pxtorem/tree/6.0.0)如下：

- `rootValue`：代表根元素的字体大小，要与上面的 `font-size` 保持相同以便匹配。
- `unitPrecision`：允许 rem单位增长到的小数位数。
- `propList`：可以从 px 转换为 rem 的属性列表。使用通配符 `*` 启用所有属性。
- `replace`：替换包含 rems 的规则，而不是添加回退。
- `mediaQuery`：允许在媒体查询中转换 px。
- `minPixelValue`：设置要替换的最小像素值。
- `exclude`：要忽略的文件路径。

#### 2.3.4. 添加node环境提示

