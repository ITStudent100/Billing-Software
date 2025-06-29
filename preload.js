const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  printToPrinter: (printerName, content) => ipcRenderer.send('print-to-printer', printerName, content),
});