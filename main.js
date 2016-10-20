'use strict';

const electron = require('electron');

const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 350,
    width: 350,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('close-main-window', () => {
  app.quit();
});
