const { app, Menu, shell } = require('electron')

const template = [
  {
    role: 'view',
    label: '查看',
    submenu: [
      { label: '重新加载', role: 'reload' },
      { label: '切换开发者工具', role: 'toggledevtools' },
      { type: 'separator' },
      { label: '重置大小', role: 'resetzoom', accelerator: 'Ctrl+0' },
      { label: '放大', role: 'zoomin', accelerator: 'Ctrl+=' },
      { label: '缩小', role: 'zoomout' },
      { type: 'separator' },
      { label: '切换全屏', role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    label: '窗口',
    submenu: [
      { label: '最小化', role: 'minimize' },
      { label: '关闭', role: 'close' }
    ]
  },
  {
    role: 'help',
    label: '帮助',
    submenu: [
      {
        label: 'Electron Docs',
        click() {
          shell.openExternal('https://electronjs.org/')
        }
      },
      {
        label: 'GitHub',
        click() {
          shell.openExternal('https://github.com/6Starlong/vite-electron')
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.name,
    submenu: [
      // ...
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
