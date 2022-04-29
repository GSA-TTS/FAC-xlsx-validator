const { app, BrowserWindow } = require('electron')
var XLSX = require("xlsx");

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600
      // FIXME: Preload was throwing uncaught exception errors
    })
  
    win.loadFile('index.html')
    // FIXME: Don't generally want this.
    win.webContents.openDevTools()
  }
  

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  // FIXME: How do we handle closing across all platforms?
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })