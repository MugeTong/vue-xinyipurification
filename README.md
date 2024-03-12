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

为了能够更好的区分页面的逻辑结构，我们在项目中 `\src` 下新建以下文件夹：

- `styles`：用于存放基础的CSS和SASS配置文件；
- `utils`：用于存放接口的工具文件；
- `apis`：存放具体的接口；

并将 `main.css` 和 `base.css` 中的文件移到 `styles` 文件夹中（要注意修改 `main.js` 文件中对于样式文件的引用）。修改样式文件的主要内容以匹配项目，同时清空不必要的示例文件，具体见代码文件。

### 2.3. 
