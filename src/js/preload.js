const { ipcRenderer, contextBridge, remote } = require('electron');
const { dialog, shell, BrowserWindow } = remote;
const fs = require('fs');
const { readFileSync, writeFileSync } = fs;

const { platform } = require('os');

contextBridge.exposeInMainWorld(
    'api',
    {
        dialog: dialog,
        shell: shell,
        readFileSync: readFileSync,
        writeFileSync: writeFileSync,
        platform: platform,
        fs: fs,
        browserWindow: BrowserWindow
    }
)