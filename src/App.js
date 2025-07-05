// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import loginBg from './assets/login.jpg';
import { format } from 'date-fns';

const PASSWORD = '1001';
const CUT = '\x1D\x56\x00';
const todayKey = format(new Date(), 'yyyy-MM-dd');
const salesFilename = `sales-${todayKey}.json`;
const closedFilename = `sales-${todayKey}.closed.json`;

const fullMenu = [ {
    category: "Lassi",
    items: [
      { name: "Royal Lassi", price: 100 },
      { name: "Fruit N Cream Lassi", price: 100 },
      { name: "Dry Fruit Lassi", price: 120 }
    ]
  },
  {
    category: "Special Ice-Cream",
    items: [
      { name: "Chocolate Fudge", price: 100 },
      { name: "Butterscotch Fudge", price: 100 },
      { name: "Spanish Model", price: 100 },
      { name: "Brownie Fudge", price: 120 },
      { name: "Death by Chocolate", price: 120 },
      { name: "Scottish Chocolate", price: 120 }
    ]
  },
  {
    category: "Fruit Salad",
    items: [
      { name: "Fruit Salad", price: 60 },
      { name: "Fruit Salad with Ice-Cream", price: 80 }
    ]
  },
  {
    category: "Mixed Fruit Shakes",
    items: [
      { name: "Doky Doky Cocktail", price: 90 },
      { name: "Vanilla", price: 100 },
      { name: "Strawberry", price: 100 },
      { name: "Fruit Overload", price: 120 }
    ]
  },
  {
    category: "Smoothies",
    items: [
      { name: "Banana Smoothie", price: 70 },
      { name: "Mango Smoothie", price: 70 },
      { name: "Strawberry Smoothie", price: 70 }
    ]
  },
  {
    category: "Cold Coffee",
    items: [
      { name: "Cold Coffee", price: 80 },
      { name: "Butterscotch Coffee", price: 80 },
      { name: "Chocolate Coffee", price: 100 },
      { name: "Oreo & Coffee", price: 100 },
      { name: "Mud Coffee", price: 100 },
      { name: "Choco Mud Coffee", price: 130 }
    ]
  },
  {
    category: "Falooda",
    items: [
      { name: "Falooda with Ice-Cream", price: 80 },
      { name: "Saffron Falooda", price: 100 },
      { name: "Kashmiri Falooda", price: 120 }
    ]
  },
  {
    category: "Mocktails",
    items: [
      { name: "Banana Bonkers", price: 60 },
      { name: "Very Berry Strawberry ", price: 60 },
      { name: "Vanilla", price: 60 },
      { name: "Mango  Berry", price: 60 },
      { name: "Body Cooler", price: 60 },
      { name: "Apple", price: 80 },
      { name: "Chikoo", price: 80 },
      { name: "Chocochip Cookies", price: 80 },
      { name: "Chocolate Mocha", price: 80 },
      { name: "Ferrero Rocher", price: 80 },
      { name: "Chocolate Frappe", price: 80 },
      { name: "Hop Scotch Butterscotch", price: 80 },
      { name: "Mango Alphonso", price: 90 },
      { name: "Tender Coconut", price: 90 },
      { name: "Kitkat Shake", price: 90 },
      { name: "Snickers Shake", price: 90 },
      { name: "Dark Dark Fantasy", price: 90 },
      { name: "Sharjah to Pala", price: 90 },
      { name: "Kaju Anjeer", price: 100 },
      { name: "Oreo Shake", price: 90 },
    ]
  },
  {
    category: "Special Mocktails",
    items: [
      { name: "Belgian Chocolate", price: 100 },
      { name: "Mississippi", price: 110 },
      { name: "Belgian Double", price: 120 },
      { name: "Dry Fruit Shake", price: 120 },
      { name: "Choco Dry Fruit", price: 120 },
      { name: "Lassi Day Twister", price: 120 },
      { name: "The Special", price: 120 },
      { name: "Mississippi Choco Mud", price: 130 }
    ]
  },
  {
    category: "Mojitos",
    items: [
      { name: "Thunder Strawbo", price: 120 },
      { name: "Passion Fassion", price: 120 },
      { name: "Blueberry Chiller", price: 120 },
      { name: "Cool Blued", price: 120 },
      { name: "Mint n Mint", price: 120 }
    ]
  },
  {
    category: "Juices",
    items: [
      { name: "Fresh Lime/Ginger Lime", price: 25 },
      { name: "Orange", price: 50 },
      { name: "Pineapple", price: 50 },
      { name: "Mexican Mint", price: 50 },
      { name: "Watermelon Lime", price: 50 },
      { name: "Lemon Ice Tea", price: 50 },
      { name: "Pineapple Lime", price: 50 },
      { name: "Moroccan Mint Lime", price: 50 },
      { name: "Apple", price: 70 },
      { name: "Grape", price: 70 }
    ]
  },
  {
    category: "No Sugar, No Ice & No Water",
    items: [
      { name: "ABC (Apple Beetroot Carrot)", price: 80 },
      { name: "CAP (Carrot Apple Pineapple)", price: 80 }
    ]
  },
  {
    category: "Snacks",
    items: [
      { name: "Maggi Noodles", price: 25 },
      { name: "French Fries (Half)", price: 50 },
      { name: "French Fries (Full)", price: 80 },
      { name: "Panipuri (6 pieces)", price: 80 }
    ]
    },
  {
    category: "Beverages",
    items: [
      { name: "Tea", price: 15},
      { name: "Coffee", price: 20},
    ]
  }];

function App() {
  const [view, setView] = useState('login');
  const [pw, setPw] = useState('');
  const [adminPw, setAdminPw] = useState('');
  const [adminPrompt, setAdminPrompt] = useState(null);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [orderIdx, setOrderIdx] = useState(1);
  const [settings, setSettings] = useState({ shop: '', cashier: '', location: '' });
  const [selectedCat, setSelectedCat] = useState(null);
  const [availablePrinters, setAvailablePrinters] = useState([]);
  const [customerPrinter, setCustomerPrinter] = useState({});
  const [kitchenPrinter, setKitchenPrinter] = useState({});
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [summaryContent, setSummaryContent] = useState('');
  const [showClosePopup, setShowClosePopup] = useState(false);

  useEffect(() => {
    // Check if closed
    if (window?.electronAPI?.checkClosed) {
      window.electronAPI.checkClosed(closedFilename).then(isClosed => {
        if (isClosed) setView('locked');
      });
    }

    // Check system date
    if (format(new Date(), 'yyyy-MM-dd') !== todayKey) {
      alert(`System date mismatch! Expected ${todayKey}. Fix system date.`);
      setView('locked');
      return;
    }

    // Load sales
    window.electronAPI.readSales(salesFilename).then(stored => {
      if (stored && Array.isArray(stored)) {
        setSales(stored);
        const maxOrder = Math.max(...stored.map(s => s.order || 0), 0);
        setOrderIdx(maxOrder + 1);
      } else {
        setOrderIdx(1);
      }
    });

    // Load printer list
    window.electronAPI.getPrinters().then(setAvailablePrinters);

    // Load saved printer config
    window.electronAPI.loadPrinterSettings().then(cfg => {
      if (cfg) {
        setCustomerPrinter(cfg.customerPrinter || {});
        setKitchenPrinter(cfg.kitchenPrinter || {});
      }
    });

    // Keyboard shortcuts
    const keyHandler = e => {
      if (view === 'billing') {
        if (e.key === 'F5') {
          e.preventDefault();
          doPrintOrder();
        }
        if (e.key === 'F6') {
          e.preventDefault();
          openSummaryPreview();
        }
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [view]);

  const doLogin = () => {
    if (pw === PASSWORD) setView('home');
    else alert('Incorrect password');
  };

  const requireAdmin = action => setAdminPrompt(action);

  const handleAdmin = () => {
    if (adminPw !== PASSWORD) return alert('Wrong password');
    setAdminPrompt(null);
    switch (adminPrompt) {
      case 'open': return setView('billing');
      case 'summary': return openSummaryPreview();
      case 'settings': return setView('settings');
      case 'close': return setShowClosePopup(true);
      default: return;
    }
  };

  const doPrintOrder = () => {
    if (!cart.length) return;
    const now = new Date();
    const orderId = orderIdx;
    const dateTime = format(now, 'yyyy-MM-dd HH:mm');
    const date = format(now, 'yyyy-MM-dd');
    const time = format(now, 'HH:mm');
    const totalAmt = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  const center = txt => txt.padStart((32 + txt.length) / 2).padEnd(32);
  const CUT = '\x1D\x56\x00';

  const custReceipt = [
    center('Retail invoice'),
    center(settings.shop || 'Lassi Day Mutholy'),
    center(settings.location || 'Mutholy, Pulliyannoor P.O'),
    '',
    `Cashier: ${settings.cashier || 'Admin'}`,
    `Order No : ${orderId}`,
    `Date : ${date}       Time : ${time}`,
    '--------------------------------',
    'Item                   Qty   Price',
    '--------------------------------',
    ...cart.map(i =>
      i.name.length > 22
        ? `${i.name}\n${' '.repeat(22)}${i.qty.toString().padStart(3)} ${String(i.price * i.qty).padStart(7)}`
        : i.name.padEnd(22) +
          i.qty.toString().padStart(3) +
          String(i.price * i.qty).padStart(7)
    ),
    '--------------------------------',
    `TOTAL Qty: ${totalQty}`.padEnd(22) + totalAmt.toFixed(2).padStart(10),
    '',
    '',
    center('Thank you! Visit again!'),
    CUT
  ].join('\n');

  const kitchenCopy = [
    '--- KITCHEN COPY ---',
    `Order #${orderId}    ${date} ${time}`,
    '-------------------------------',
    ...cart.map(i =>
      i.name.padEnd(22) + ' x' + i.qty
    ),
    '',
    CUT
  ].join('\n');

  window.electronAPI.printToPrinter(customerPrinter.name, custReceipt);
  window.electronAPI.printToPrinter(kitchenPrinter.name, kitchenCopy);

  const saleEntry = { order: orderId, date: todayKey, items: cart, total: totalAmt };
  const updatedSales = [...sales, saleEntry];
  setSales(updatedSales);
  setOrderIdx(orderId + 1);
  setCart([]);
  window.electronAPI.writeSales(salesFilename, updatedSales);
};

      

    const openSummaryPreview = () => {
    if (!sales.length) return alert('No sales to summarize');
    const totalAmt = sales.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = sales.length;
    const shop = settings.shop || 'Lassi Day Mutholy';
    const location = settings.location || '';
    const cashier = settings.cashier || 'Admin';
    const now = format(new Date(), 'yyyy-MM-dd HH:mm');

    const summary = [
      '       SHIFT CLOSE SUMMARY',
      `Shop     : ${shop}`,
      `Location : ${location}`,
      `Cashier  : ${cashier}`,
      `DateTime : ${now}`,
      `Orders   : ${sales[0]?.order || 1} - ${sales[sales.length - 1]?.order || totalOrders}`,
      `Total    : ₹${totalAmt}`,
      '',
      '******** End of Report ********',
      CUT,
    ].join('\n');

    setSummaryContent(summary.trim());
    setShowSummaryPopup(true);
  };

  const doPrintSummary = () => {
    if (summaryContent) {
      window.electronAPI.printToPrinter(customerPrinter.name, summaryContent);
    }
    setShowSummaryPopup(false);
  };

  const confirmCloseDay = () => {
    window.electronAPI.writeSales(closedFilename, { closed: true });
    setSales([]);
    setShowClosePopup(false);
    setView('locked');
  };

  return (
    <>
      {/* login screen */}
      {view === 'login' && (
        <div className="login-screen" style={{ backgroundImage: `url(${loginBg})` }}>
          <div className="login-box">
            <h2>Admin Login</h2>
            <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} />
            <div className="button-row">
              <button onClick={doLogin}>Login</button>
              <button onClick={() => setPw('')}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* locked screen */}
      {view === 'locked' && (
        <div className="locked-screen">
          <h2>Day Closed</h2>
          <p>Today's date: {todayKey}</p>
          <p>The system will reopen tomorrow.</p>
        </div>
      )}

      {/* home screen */}
      {view === 'home' && (
        <div className="main-menu">
          <button onClick={() => requireAdmin('open')}>Open Day</button>
          <button onClick={() => requireAdmin('summary')}>Summary</button>
          <button onClick={() => requireAdmin('settings')}>Settings</button>
          <button onClick={() => requireAdmin('close')}>Close Day</button>
        </div>
      )}

      {/* settings screen */}
      {view === 'settings' && (
        <div className="screen">
          <h2>Settings</h2>
          <input placeholder="Shop Name" value={settings.shop} onChange={e => setSettings({ ...settings, shop: e.target.value })} />
          <input placeholder="Cashier" value={settings.cashier} onChange={e => setSettings({ ...settings, cashier: e.target.value })} />
          <input placeholder="Location" value={settings.location} onChange={e => setSettings({ ...settings, location: e.target.value })} />
          <button onClick={() => {
            window.electronAPI.savePrinterSettings({ customerPrinter, kitchenPrinter });
            setView('home');
          }}>Save & Return</button>
        </div>
      )}

      {/* billing screen */}
      {view === 'billing' && (
        <div className="billing">
          <div className="sidebar">
            {fullMenu.map(cat => (
              <button key={cat.category} onClick={() => setSelectedCat(cat.category)}>{cat.category}</button>
            ))}
          </div>
          <div className="items">
            {fullMenu.find(c => c.category === selectedCat)?.items.map(item => (
              <button key={item.name} onClick={() => {
                const existing = cart.find(i => i.name === item.name);
                if (existing) existing.qty++;
                else cart.push({ ...item, qty: 1 });
                setCart([...cart]);
              }}>
                {item.name}<br />₹{item.price}
              </button>
            ))}
          </div>
          <div className="cart">
            <h3>Cart</h3>
            {cart.map((item, idx) => (
              <div key={idx} className="cart-row">
                <div className="item-col">{item.name}</div>
                <div className="qty-col qty-controls">
                  <button onClick={() => {
                    item.qty--;
                    if (item.qty <= 0) cart.splice(idx, 1);
                    setCart([...cart]);
                  }}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => {
                    item.qty++;
                    setCart([...cart]);
                  }}>+</button>
                </div>
                <div className="price-col">₹{item.qty * item.price}</div>
              </div>
            ))}

            <div className="cart-total" style={{
              padding: '10px 0',
              marginTop: '12px',
              fontSize: '20px',
              color: '#FFEB3B',
              textAlign: 'right',
              borderTop: '2px solid #ff4081'
            }}>
              Total: ₹{cart.reduce((sum, i) => sum + i.qty * i.price, 0)}
            </div>

            <button onClick={doPrintOrder}>Print Receipt (F5)</button>
            <button onClick={() => setCart([])}>Clear Cart</button>
            <button onClick={() => setView('home')}>End Shift</button>
          </div>
        </div>
      )}

      {/* Admin password prompt */}
      {adminPrompt && (
        <div className="overlay">
          <div className="popup-box">
            <h3>Admin Password</h3>
            <input type="password" value={adminPw} onChange={e => setAdminPw(e.target.value)} />
            <div className="button-row">
              <button onClick={handleAdmin}>OK</button>
              <button onClick={() => setAdminPrompt(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Preview */}
      {showSummaryPopup && (
        <div className="overlay">
          <div className="popup-box">
            <h3>Summary Preview</h3>
            <textarea readOnly value={summaryContent} style={{ height: '250px', width: '100%' }} />
            <div className="button-row">
              <button onClick={doPrintSummary}>Print</button>
              <button onClick={() => setShowSummaryPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Close day popup */}
      {showClosePopup && (
        <div className="overlay">
          <div className="popup-box">
            <h3>Close Day</h3>
            <p>Today's Date: {todayKey}</p>
            <textarea readOnly value={summaryContent} style={{ height: '200px', width: '100%' }} />
            <div className="button-row">
              <button onClick={confirmCloseDay}>Print & Close</button>
              <button onClick={() => setShowClosePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default App;