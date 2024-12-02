import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { initAppPaths } from '../src/utils/paths'

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    transparent: false,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 开发环境下加载本地服务
  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    // 生产环境下加载打包后的index.html
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.whenReady().then(() => {
  // 初始化应用数据目录
  initAppPaths()
  
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 窗口控制事件监听
ipcMain.on('window-minimize', () => {
  win?.minimize()
})

ipcMain.on('window-toggle-maximize', () => {
  if (win?.isMaximized()) {
    win.restore()
  } else {
    win?.maximize()
  }
})

ipcMain.on('window-close', () => {
  win?.close()
}) 