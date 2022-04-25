// preload.js
const { ipcRenderer } = require('electron')

// 所有 Node.js API 都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version: ${process.versions[type]}`)
  }

  // 主进程与渲染进程的异步通信
  ipcRenderer.on('message-reply', (event, arg) => {
    console.log(arg) // prints "🎉🎉🎉 App Loaded!"
  })
  ipcRenderer.send('send-message', 'App Loaded!')
})
