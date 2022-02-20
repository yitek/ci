const { app, BrowserWindow } = require('electron') //以前node的导入方式

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
})