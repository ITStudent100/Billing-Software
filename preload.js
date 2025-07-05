const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readSales: (file) => ipcRenderer.invoke('read-sales', file),
  writeSales: (file, data) => ipcRenderer.invoke('write-sales', file, data),
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  printToPrinter: (printerName, data) =>
    ipcRenderer.send('print-to-printer', { printerName, data }),
  printShiftSummary: (sales, shopName, cashierName) =>
    ipcRenderer.send('print-shift-summary', sales, shopName, cashierName),
  savePrinterSettings: (data) =>
    ipcRenderer.send('save-printer-settings', data),
  loadPrinterSettings: () =>
    ipcRenderer.invoke('load-printer-settings'),

  // ✅ NEW: Test printer
  testPrinter: (printerName) =>
    ipcRenderer.send('test-printer', printerName),

  // ✅ NEW: Preview summary before printing
  previewShiftSummary: (sales, shopName, cashierName) =>
    ipcRenderer.invoke('preview-shift-summary', sales, shopName, cashierName),

  // ✅ FIX: Add this line to prevent crash
  checkClosed: (filename) => ipcRenderer.invoke('check-closed', filename),
});