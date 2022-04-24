const { app, BrowserWindow } = require('electron')
const { join } = require('path')

const createWindow = () => {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    // frame: false,
    // resizable: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enablemotemodule: true
    }
  })

  if (app.isPackaged) {
    // 生产配置
    const indexPath = '../dist/build'
    win.setIcon(join(__dirname, indexPath, '/favicon.ico'))
    // 加载文件
    win.loadFile(join(__dirname, indexPath, '/index.html'))
  } else {
    // 开发配置
    win.setIcon(join('./dist/build/favicon.ico'))
    // 加载url
    win.loadURL('http://127.0.0.1:3000')

    // 打开开发工具
    win.webContents.openDevTools()
  }
}

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用，部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他打开的窗口，那么程序会重新创建一个窗口。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
