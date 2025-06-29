const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    autoHideMenuBar: true
  });
  win.loadURL('http://localhost:3000');
}

ipcMain.handle('print', (_, content) => {
  const win = new BrowserWindow({ show: false });
  win.loadURL(`data:text/html,<pre style="font-family:'Courier New';">${encodeURIComponent(content)}</pre>`);
  win.webContents.on('did-finish-load', () => {
    win.webContents.print({ silent: true, printBackground: false });
  });
});

ipcMain.handle('read-sales', (_, file) => {
  const f = path.join(app.getPath('userData'), file);
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch { return []; }
});

ipcMain.handle('write-sales', (_, file, data) => {
  const f = path.join(app.getPath('userData'), file);
  fs.writeFileSync(f, JSON.stringify(data, null, 2));
});

// Make sure this is after app is ready
const getSettingsFile = () => path.join(app.getPath('userData'), 'printer-settings.json');

ipcMain.handle('get-printers', async () => {
  const printers = BrowserWindow.getFocusedWindow().webContents.getPrinters();
  return printers;
});

ipcMain.on('save-printer-settings', (event, data) => {
  const settingsFile = getSettingsFile();
  fs.writeFileSync(settingsFile, JSON.stringify(data));
});

ipcMain.handle('load-printer-settings', async () => {
  const settingsFile = getSettingsFile();
  if (fs.existsSync(settingsFile)) {
    const raw = fs.readFileSync(settingsFile);
    return JSON.parse(raw);
  }
  return null;
});

ipcMain.on('print-shift-summary', (event, sales) => {
  const total = sales.reduce((sum, o) => sum + o.total, 0);
  const text = `
SHIFT CLOSE SUMMARY
Date: ${new Date().toLocaleDateString()}
Orders: ${sales.length}
Total: ₹${total}
******** END ********
  `;

  const win = new BrowserWindow({ show: false });
  win.loadURL(`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  win.webContents.on('did-finish-load', () => {
    win.webContents.print({ silent: true }, () => win.close());
  });
});

app.whenReady().then(createWindow);

ipcMain.on('print-shift-summary', (event, sales, shopName, cashierName) => {
  const total = sales.reduce((sum, o) => sum + o.total, 0);
  const html = `
    <h1>SHIFT CLOSE SUMMARY</h1>
    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    <p><strong>Shop:</strong> ${shopName}</p>
    <p><strong>Cashier:</strong> ${cashierName}</p>
    <p><strong>Orders:</strong> ${sales.length}</p>
    <p><strong>Total:</strong> ₹${total}</p>
    <pre>******** END ********</pre>
  `;

  const win = new BrowserWindow({ show: false });
  win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  win.webContents.on('did-finish-load', () => {
    win.webContents.print({ silent: true }, () => win.close());
  });
});

ipcMain.on('print-to-printer', (event, printerName, content) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  // Create a hidden window to print the content
  const printWin = new BrowserWindow({ show: false });
  printWin.loadURL(`data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  printWin.webContents.on('did-finish-load', () => {
    printWin.webContents.print({
      silent: true,
      printBackground: false,
      deviceName: printerName,
    }, (success, failureReason) => {
      if (!success) console.log('Print failed: ' + failureReason);
      printWin.close();
    });
  });
});

// React component code (to be used in your renderer process)
<div className="main-menu fade-in">
  <button onClick={openDay}>🟢<br />Open Day</button>
  <button onClick={printSummary}>🧾<br />Summary</button>
  <button onClick={() => setView('settings')}>🛠<br />Settings</button>
  <button onClick={closeDay}>🔴<br />Close Day</button>
</div>