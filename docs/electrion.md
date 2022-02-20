
electron快速上手[^quick_start]
=======================================
## 简介
1. 用web技术开发
2. 跨平台的桌面应用
官网地址https://www.electronjs.org/

## Prerequisites
1 node
检查node是否安装
```powershell
node -v 
npm -v
```

## 安装
### 创建工程目录
创建一个工程目录，进入工程目录
```powershell
md desktop
cd desktop
```
**后面的操作都在工程目录下进行**
### 创建node工程
用npm初始化该目录成node工程
```
npm init
```
*** 将应用主程序设置为 entry.js***

### 添加开发依赖
```
npm install --save-dev electron
```

### 添加应用主程序
main.js
```js
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
})
```

### 添加启动命令
在node项目文件package.json中添加启动脚本
```json
"scripts": {
    "start": "electron ."
  }
```

### 创建入口页面 ./index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>
```



启动electron
```
npm start
```
## 打包与分发[^dev_pack][^simple_use_ElectronForge]
这里用最简单的electron-forge命令行打包
还有其他的打包器,比如electron-builder可以使用[^pack]
### 安装打包器
```
npm install --save-dev @electron-forge/cli
```

### 项目中导入打包流程
```
npx electron-forge import
```
**NPM6与NPM7的命令行不一样，这里用的NPM7的[^simple_use_ElectronForge]**
该命令会修改package.json文件
1. script添加了 start/package/make命令
2. 添加了一些开发依赖: @electron-forge/maker-deb,@electron-forge/maker-rpm,@electron-forge/maker-squirrel,@electron-forge/maker-zip
3. 添加了运行期依赖: electron-squirrel-startup
4. 添加了config/forge
  
### 
```
npm run make
```
运行完成后可以在out目录中找到exe应用程序(windows平台)。
这里有两种形式的打包，分别在不同场景下使用
electron-forge package 只是打包成一个目录到out目录下，注意这种打包一般用于调试，并不是用于分发
electron-forge make 这个才会打出真正的分发包，放在out\make目录下
两个命令都可以使用--arch 和--platform参数来指定系统结构和平台，但是需要注意的是只能打包你当前机器的平台包，比如你用OSX是无法打出windows平台安装包的；这两个参数不填写的话，默认和当前系统一致
另外，make是用squirrel打出来的包，安装后是放在%localappdata%下的


## 问题集
### 运行make打包时出现:An unhandled error has occurred inside Forge: An error occured while making for target: squirrel

https://blog.csdn.net/JKR10000/article/details/112387982

[^offical_site]: [offical site](https://www.electronjs.org/)
[^quick_start]: [electron quick start](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)
[^pack]: [boilerplates-and-clis](https://www.electronjs.org/zh/docs/latest/tutorial/boilerplates-and-clis)
[^dev_pack]: [Electron应用的开发和打包](https://www.jianshu.com/p/51a1f4f9dae3)
[^simple_use_ElectronForge]: [Electron脚手架 - ElectronForge使用文档](https://blog.csdn.net/wanzheng_96/article/details/118223970)