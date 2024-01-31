const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            // preload: path.join(__dirname, '*.js')
        },
        icon: __dirname + '/icon/icon'

    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) createWindow()
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})