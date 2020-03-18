const elecrton = require('electron')
const {app, BrowserWindow, Menu, dialog} = require('electron')


function createWindow(){
    console.log('Start the app')
    let win1 = new BrowserWindow({
        width :850,
        height: 650,
        minWidth: 780,
        minHeight: 700,
        frame: false,
        webPreferences:{
            nodeIntegration: true
        }
    })

    win1.loadFile('index.html');
}

Menu.setApplicationMenu(false)
app.on('ready', createWindow)
app.on('close', ()=>{console.log('Exiting')})
