const { app, BrowserWindow, Menu } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    min_width: 400,
    min_height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');

  win.on('closed', () => {
    win = null;
  });

  // Create a custom menu template
  const menuTemplate = [
    {
      label: 'About',
      submenu: [
        {
          label: 'About author',
          click: () => {
            console.log('About My App clicked');
          }
        }
      ]
    }
  ];

  // Create the menu
  const menu = Menu.buildFromTemplate(menuTemplate);

  // Set the menu for the window
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});