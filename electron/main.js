const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')

/**
 * @description 资源路径的转换：
 * 开发环境下，资源路径指向 /dist/build/electron-main 目录
 * 生产环境下，资源路径相对于当前文件目录
 */
const isDev = process.env.NODE_ENV === 'development'
const midPath = isDev ? '../../../electron/' : '../dist/build/'

const createWindow = () => {
  // 创建浏览器窗口，配置参考: https://www.electronjs.org/zh/docs/latest/api/browser-window
  const win = new BrowserWindow({
    width: 900,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, isDev ? midPath : '', 'preload.js'),
      nodeIntegration: true
    }
  })

  if (app.isPackaged) {
    // 生产配置
    win.setIcon(join(__dirname, midPath, 'favicon.ico'))
    // 加载文件
    win.loadFile(join(__dirname, midPath, 'index.html'))
  } else {
    // 开发配置
    win.setIcon(join('public/favicon.ico'))
    // 加载url
    win.loadURL('http://127.0.0.1:3000')
  }

  // 引入自定义菜单
  require(join(__dirname, isDev ? midPath : '', 'menu.js'))

  // 主进程与渲染进程的异步通信
  ipcMain.on('send-message', (event, arg) => {
    console.log(arg) // prints "Loaded!"
    event.reply('message-reply', '🎉🎉🎉 App Loaded!')
  })
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
