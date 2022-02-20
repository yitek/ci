调试electron应用
==============================
## 开发调试electron主进程代码[^app_dev][^use_vscode]
在vscode中添加调试入口配置.vscode/launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
		// 该节配置electron的main(启动应用，创建窗口等代码)执行调试。
    {
      "type": "node",
      "request": "launch",
      "name": "Main",
			// 启动时执行electron
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
			// 执行electron的参数
      "runtimeArgs": ["--remote-debugging-port=9222", "."],
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      }
    },
		// 该节启动electron里面的浏览器的调试
    {
      "name": "Renderer",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "webRoot": "${workspaceFolder}"
    }
  ],
  "compounds": [
    {
      "name": "All",
      "configurations": ["Main", "Renderer"]
    }
  ]
}
```

## 调试渲染进程
### 打开BrowserWindow的devtools
```js
mainWindow.webContents.openDevTools({mode:'detach/left/right/bottom'})
mainWindow.webContents.closeDevTools()
```


[^app_dev]: [Electron 应用调试指南](https://zhuanlan.zhihu.com/p/91259973)
[^use_vscode]: [使用 VsCode调试](https://www.electronjs.org/zh/docs/latest/tutorial/debugging-vscode)