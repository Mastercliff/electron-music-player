const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');



function createWindow() {
    console.log('Start the app')
    let win1 = new BrowserWindow({
        width: 800,
        height: 650,
        minWidth: 780,
        minHeight: 700,
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), 'src/js/preload.js')
        }
    })

    win1.loadFile('./src/index.html');
}

//Menu.setApplicationMenu(false)
app.on('ready', createWindow)
app.on('close', () => { console.log('Exiting') })
