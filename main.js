const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true
  });

  win.loadFile(path.join(__dirname, 'build', 'index.html'));
}

// Sales storage handlers
ipcMain.handle('read-sales', (_, file) => {
  const f = path.join(app.getPath('userData'), file);
  try {
    return JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch {
    return [];
  }
});

ipcMain.handle('write-sales', (_, file, data) => {
  const f = path.join(app.getPath('userData'), file);
  fs.writeFileSync(f, JSON.stringify(data, null, 2));
});

// Print to selected printer
ipcMain.on('print-to-printer', (event, { printerName, data }) => {
  const printWin = new BrowserWindow({ show: false });
  printWin.loadURL(`data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
  printWin.webContents.on('did-finish-load', () => {
    printWin.webContents.print({
      silent: true,
      printBackground: false,
      deviceName: printerName || undefined,
    }, (success, failureReason) => {
      if (!success) {
        console.log('Print failed:', failureReason);
      }
      printWin.close();
    });
  });
});

// Printer Test Page
ipcMain.on('test-printer', (event, printerName) => {
  const testContent = [
    '*** TEST PRINT PAGE ***',
    'Printer: ' + printerName,
    'Date: ' + new Date().toLocaleString(),
    '',
    'This is a test print from Lassi Day billing software.',
    '',
    '********** END **********'
  ].join('\n');

  const testWin = new BrowserWindow({ show: false });
  testWin.loadURL(`data:text/plain;charset=utf-8,${encodeURIComponent(testContent)}`);
  testWin.webContents.on('did-finish-load', () => {
    testWin.webContents.print({
      silent: true,
      printBackground: false,
      deviceName: printerName || undefined,
    }, (success, error) => {
      if (!success) console.log('Test Print Failed:', error);
      testWin.close();
    });
  });
});

// Shift summary print (opens preview and waits for user action)
ipcMain.handle('preview-shift-summary', (event, sales, shopName, cashierName) => {
  const total = sales.reduce((sum, o) => sum + o.total, 0);
  const html = `
    <html>
      <head>
        <style>
          body { font-family: 'Courier New'; padding: 20px; }
          h1 { text-align: center; }
          .summary-line { margin: 5px 0; }
          .footer { margin-top: 20px; text-align: center; }
          button { margin: 10px; padding: 10px 20px; font-size: 16px; }
        </style>
      </head>
      <body>
        <h1>SHIFT CLOSE SUMMARY</h1>
        <div class="summary-line"><strong>Date:</strong> ${new Date().toLocaleString()}</div>
        <div class="summary-line"><strong>Shop:</strong> ${shopName}</div>
        <div class="summary-line"><strong>Cashier:</strong> ${cashierName}</div>
        <div class="summary-line"><strong>Total Orders:</strong> ${sales.length}</div>
        <div class="summary-line"><strong>Total:</strong> ₹${total}</div>
        <div class="footer">
          <hr />
          <p>******** END OF REPORT ********</p>
          <button onclick="window.print()">🖨️ Print</button>
          <button onclick="window.close()">❌ Cancel</button>
        </div>
      </body>
    </html>
  `;

  const previewWin = new BrowserWindow({
    width: 500,
    height: 600,
    show: true,
    title: "Print Summary Preview",
  });

  previewWin.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
});

// Printer settings
const getSettingsFile = () => path.join(app.getPath('userData'), 'printer-settings.json');

ipcMain.handle('get-printers', async () => {
  const win = BrowserWindow.getFocusedWindow();
  return win ? await win.webContents.getPrintersAsync() : [];
});

ipcMain.on('save-printer-settings', (event, data) => {
  fs.writeFileSync(getSettingsFile(), JSON.stringify(data));
});

ipcMain.handle('load-printer-settings', async () => {
  const file = getSettingsFile();
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return null;
});

ipcMain.handle('check-closed', async (_, filename) => {
  const filePath = path.join(app.getPath('userData'), filename);
  return fs.existsSync(filePath);
});

app.whenReady().then(createWindow);