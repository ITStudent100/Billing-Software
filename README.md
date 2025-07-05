# 🧾 Lassi Day Billing Software

A full-featured desktop billing software for **"Lassi Day" café**, built using **React** and **Electron**.  
Designed for fast, efficient counter billing with a beautiful fruit-themed UI, category-wise menu, touch-friendly interface, password protection, and **POS printer support**.

---

## ✨ Features

- 🔐 **Admin Login** with password and on-screen keyboard
- 🖥️ **Touch-friendly layout** — Large, glowing buttons optimized for café counters
- 🍹 **Category-based menu** — Lassi, Mocktails, Juices, Beverages, Snacks, etc.
- 🧾 **Dual Receipt Printing** — Prints both **Customer copy** and **Kitchen copy**
- 🧮 **Shift Summary Print** — With cashier name, sales total, opening/closing cash
- ⌨️ **Shortcut Keys**:
  - `F4` — Open Settings
  - `F5` — Print Receipt
  - `F6` — Print Summary
- ⚙️ **Settings Panel** to configure:
  - Shop name, POS name, cashier, cash in hand
- 💾 **Local JSON & CSV storage** — Saves daily sales locally
- 📦 **Packaged via Electron** — Standalone `.exe` ready (no browser required)
- 🌈 **Hover Glow Effects** — Dashboard buttons glow on hover for visual clarity

---

## 💻 Tech Stack

- **React.js** — Interactive frontend
- **Electron.js** — Desktop app packaging
- **Node.js** — Runtime and file access
- **Thermal POS Printer** — Direct print integration
- **Local Storage** — `.json` & `.csv` daily data saving
- 

---

## 💡 Code Highlights
📦 1. Dual Receipt Printing (F5)
// F5 - Print both Customer & Kitchen receipt


function printReceipt(order) {
  const customerCopy = formatReceipt(order, "Customer");
  const kitchenCopy = formatReceipt(order, "Kitchen");
  sendToPrinter(customerCopy);
  sendToPrinter(kitchenCopy);
}


🖨️ This ensures both copies are printed instantly using thermal printer.

📊 2. Daily Shift Summary Print (F6)


function printShiftSummary() {
  const summary = generateSummary();
  summary += `\n******** End of Report ********`;
  sendToPOSPrinter(summary);
}


🧾 Called on logout or when pressing F6, prints POS-style summary.

🌈 3. Hover Glow Effect on Dashboard Buttons


.dashboard-button:hover {
  box-shadow: 0 0 10px #FF4081;
  transform: scale(1.05);
  transition: 0.3s;
}


✨ Dashboard buttons glow when hovered, giving it a café-style feel.

## 📸 Screenshots

### 🔐 Admin Login Page  
> Touchscreen-compatible login with glowing design.

![Login Page](./screenshots/Login%20Page.png)

---

### 🍹 Dashboard / Main Menu  
> Smooth glowing effect when hovering over "Open Day", "Summary", "Settings", and "Close Day".

![Dashboard](./screenshots/Dashboard.png)

---

## 🧪 Installation

To run locally:

```bash
git clone https://github.com/ITStudent100/Billing-Software.git
cd Billing-Software
npm install
npm start

📁 Folder Structure
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── components/
├── screenshots/
│   ├── Dashboard.png
│   └── Login Page.png
├── package.json
├── preload.js
├── README.md

📄 License

This software is intended for personal, educational, or non-commercial café use.
Please retain credit if reused or showcased.

⸻

👤 Author

Developed by: Jose Mathews
🎯 Focused on intuitive UI, efficient billing, and POS hardware integration.
