# 🧾 Lassi Day Billing Software

A full-featured billing software for **"Lassi Day" café**, built with **React** and **Electron**. Includes an intuitive UI with category-wise menu management, POS-style receipt printing (customer & kitchen copies), daily sales summary printing, and full offline functionality.

---

## 🌟 Features

- 🔐 **Secure login** with password protection
- 🧾 **POS receipt printing** with:
  - Customer copy
  - Kitchen copy
  - Order number, date, time
- ⏱️ **Daily Shift Close Summary** with:
  - Cash in hand, Net sale, Cash summary
  - Triggered via **F6** or Logout
- 🔣 **Keyboard Shortcuts**:
  - F4 – Settings
  - F5 – Print Receipt
  - F6 – Print Summary
- 💡 **Modern UI** with:
  - Vertical menu layout
  - Neon/café-style color theme
  - Touch-friendly large buttons
- 🧾 **On-screen keyboard** support for password input
- 📁 Save **.csv sales history** daily
- 💾 Settings panel to customize:
  - Shop name, cashier, POS name, cash in hand

---

## 🖥️ Tech Stack

- ⚛️ React (frontend)
- 🧩 Electron (desktop wrapper)
- 📦 Node.js
- 🖨️ POS Printer integration
- 🧠 Local `.json` storage (no internet needed)

---

## ⚙️ Installation

```bash
git clone https://github.com/ITStudent100/Billing-Software.git
cd Billing-Software
npm install
