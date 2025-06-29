// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import loginBg from './assets/login.jpg';

<div
  className="login-screen"
  style={{
    backgroundImage: `url(${loginBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
></div>
const PASSWORD = '1001';
const todayKey = new Date().toISOString().split('T')[0];
const salesFile = `sales-${todayKey}.json`;

const fullMenu = [
	{
		category: 'Lassi',
		items: [
			{ name: 'Royal Lassi', price: 100 },
			{ name: 'Fruit N Cream Lassi', price: 100 },
			{ name: 'Dry Fruit Lassi', price: 120 },
		],
	},
	{
		category: 'Special Ice-Cream',
		items: [
			{ name: 'Chocolate Fudge', price: 100 },
			{ name: 'Butterscotch Fudge', price: 100 },
			{ name: 'Spanish Model', price: 100 },
			{ name: 'Brownie Fudge', price: 120 },
			{ name: 'Death by Chocolate', price: 120 },
			{ name: 'Scottish Chocolate', price: 120 },
		],
	},
	{
		category: 'Fruit Salad',
		items: [
			{ name: 'Fruit Salad', price: 60 },
			{ name: 'Fruit Salad with Ice-Cream', price: 80 },
		],
	},
	{
		category: 'Mixed Fruit Shakes',
		items: [
			{ name: 'Doky Doky Cocktail', price: 90 },
			{ name: 'Vanilla', price: 100 },
			{ name: 'Strawberry', price: 100 },
			{ name: 'Fruit Overload', price: 120 },
		],
	},
	{
		category: 'Smoothies',
		items: [
			{ name: 'Banana Smoothie', price: 70 },
			{ name: 'Mango Smoothie', price: 70 },
			{ name: 'Strawberry Smoothie', price: 70 },
		],
	},
	{
		category: 'Cold Coffee',
		items: [
			{ name: 'Cold Coffee', price: 80 },
			{ name: 'Butterscotch Coffee', price: 80 },
			{ name: 'Chocolate Coffee', price: 100 },
			{ name: 'Oreo & Coffee', price: 100 },
			{ name: 'Mud Coffee', price: 100 },
			{ name: 'Choco Mud Coffee', price: 130 },
		],
	},
	{
		category: 'Falooda',
		items: [
			{ name: 'Falooda with Ice-Cream', price: 80 },
			{ name: 'Saffron Falooda', price: 100 },
			{ name: 'Kashmiri Falooda', price: 120 },
		],
	},
	{
		category: 'Mocktails',
		items: [
			{ name: 'Apple', price: 80 },
			{ name: 'Chikoo', price: 80 },
			{ name: 'Chocochip Cookies', price: 80 },
			{ name: 'Chocolate Mocha', price: 80 },
			{ name: 'Ferrero Rocher', price: 80 },
			{ name: 'Chocolate Frappe', price: 80 },
			{ name: 'Hop Scotch Butterscotch', price: 80 },
			{ name: 'Mango Alphonso', price: 90 },
			{ name: 'Tender Coconut', price: 90 },
			{ name: 'Kitkat Shake', price: 90 },
			{ name: 'Snickers Shake', price: 90 },
			{ name: 'Dark Dark Fantasy', price: 90 },
			{ name: 'Sharjah to Pala', price: 90 },
			{ name: 'Kaju Anjeer', price: 100 },
			{ name: 'Oreo Shake', price: 90 },
		],
	},
	{
		category: 'Special Mocktails',
		items: [
			{ name: 'Belgian Chocolate', price: 100 },
			{ name: 'Mississippi', price: 110 },
			{ name: 'Belgian Double', price: 120 },
			{ name: 'Dry Fruit Shake', price: 120 },
			{ name: 'Choco Dry Fruit', price: 120 },
			{ name: 'Lassi Day Twister', price: 120 },
			{ name: 'The Special', price: 120 },
			{ name: 'Mississippi Choco Mud', price: 130 },
		],
	},
	{
		category: 'Mojitos',
		items: [
			{ name: 'Thunder Strawbo', price: 120 },
			{ name: 'Passion Fassion', price: 120 },
			{ name: 'Blueberry Chiller', price: 120 },
			{ name: 'Cool Blued', price: 120 },
			{ name: 'Mint n Mint', price: 120 },
		],
	},
	{
		category: 'Juices',
		items: [
			{ name: 'Fresh Lime/Ginger Lime', price: 25 },
			{ name: 'Orange', price: 50 },
			{ name: 'Pineapple', price: 50 },
			{ name: 'Mexican Mint', price: 50 },
			{ name: 'Watermelon Lime', price: 50 },
			{ name: 'Lemon Ice Tea', price: 50 },
			{ name: 'Pineapple Lime', price: 50 },
			{ name: 'Moroccan Mint Lime', price: 50 },
			{ name: 'Apple', price: 70 },
			{ name: 'Grape', price: 70 },
		],
	},
	{
		category: 'No Sugar, No Ice & No Water',
		items: [
			{ name: 'ABC (Apple Beetroot Carrot)', price: 80 },
			{ name: 'CAP (Carrot Apple Pineapple)', price: 80 },
		],
	},
	{
		category: 'Snacks',
		items: [
			{ name: 'Maggi Noodles', price: 25 },
			{ name: 'French Fries (Half)', price: 50 },
			{ name: 'French Fries (Full)', price: 80 },
			{ name: 'Panipuri (6 pieces)', price: 80 },
		],
	},
];

function App() {
	const [view, setView] = useState('login');
	const [settingsTab, setSettingsTab] = useState('shop');
	const [pw, setPw] = useState('');
	const [cart, setCart] = useState([]);
	const [selectedCat, setSelectedCat] = useState(null);
	const [settings, setSettings] = useState({
		shop: '',
		cashier: '',
		printer: '',
	});
	const [sales, setSales] = useState([]);
	const [showSettings, setShowSettings] = useState(false);
	const [activeTab, setActiveTab] = useState('shop');
	const [shopName, setShopName] = useState('');
	const [shopLocation, setShopLocation] = useState('');
	const [cashierName, setCashierName] = useState('');
	const [posName, setPosName] = useState('');

	const [activeSettingsTab, setActiveSettingsTab] = useState('shop');
	const [customerPrinter, setCustomerPrinter] = useState('');
	const [kitchenPrinter, setKitchenPrinter] = useState('');
	const [customerPaperWidth, setCustomerPaperWidth] = useState('58mm');
	const [kitchenPaperWidth, setKitchenPaperWidth] = useState('58mm');
	const [availablePrinters, setAvailablePrinters] = useState([]);
	const [printers, setPrinters] = useState([]);

	useEffect(() => {
		if (window.electronAPI?.readSales) {
			const stored = window.electronAPI.readSales(salesFile);
			setSales(stored || []);
		}
	}, []);

	useEffect(() => {
		const handleKeys = e => {
			if (view === 'billing' && e.key === 'F5') printOrder();
			if (['billing', 'home'].includes(view) && e.key === 'F6') printSummary();
			if (e.key === 'F4') closeDay();
		};
		window.addEventListener('keydown', handleKeys);
		return () => window.removeEventListener('keydown', handleKeys);
	}, [view, cart, sales]);

	// Persist printer settings to localStorage when they change
	useEffect(() => {
		localStorage.setItem('shopName', shopName);
		localStorage.setItem('shopLocation', shopLocation);
		localStorage.setItem('cashierName', cashierName);
		localStorage.setItem('customerPrinter', customerPrinter);
		localStorage.setItem('kitchenPrinter', kitchenPrinter);
		localStorage.setItem('customerPaperWidth', customerPaperWidth);
		localStorage.setItem('kitchenPaperWidth', kitchenPaperWidth);
	}, [
		shopName,
		shopLocation,
		cashierName,
		customerPrinter,
		kitchenPrinter,
		customerPaperWidth,
		kitchenPaperWidth
	]);

	// Load printer settings from localStorage on mount
	useEffect(() => {
		setShopName(localStorage.getItem('shopName') || '');
		setShopLocation(localStorage.getItem('shopLocation') || '');
		setCashierName(localStorage.getItem('cashierName') || '');
		setCustomerPrinter(localStorage.getItem('customerPrinter') || '');
		setKitchenPrinter(localStorage.getItem('kitchenPrinter') || '');
		setCustomerPaperWidth(localStorage.getItem('customerPaperWidth') || '58');
		setKitchenPaperWidth(localStorage.getItem('kitchenPaperWidth') || '58');
	}, []);

	// Load printers from Electron on mount
	useEffect(() => {
		if (window.electronAPI?.getPrinters) {
			window.electronAPI.getPrinters().then(setAvailablePrinters);
		}
	}, []);

	// Load printer settings from Electron (if available)
	useEffect(() => {
		if (window.electronAPI?.loadPrinterSettings) {
			window.electronAPI.loadPrinterSettings().then((data) => {
				if (data) {
					setCustomerPrinter(data.customerPrinter || '');
					setKitchenPrinter(data.kitchenPrinter || '');
					setCustomerPaperWidth(data.customerPaperWidth || '58');
					setKitchenPaperWidth(data.kitchenPaperWidth || '58');
				}
			});
		}

		if (window.electronAPI?.getPrinters) {
			window.electronAPI.getPrinters().then(setPrinters);
		}
	}, []);

	// Save printer settings to Electron when they change
	useEffect(() => {
		if (window.electronAPI?.savePrinterSettings) {
			window.electronAPI.savePrinterSettings({
				customerPrinter,
				kitchenPrinter,
				customerPaperWidth,
				kitchenPaperWidth,
			});
		}
	}, [customerPrinter, kitchenPrinter, customerPaperWidth, kitchenPaperWidth]);

	const login = () => {
		if (pw === PASSWORD) setView('home');
		else alert('Incorrect password');
	};

	const openDay = () => {
		setCart([]);
		setView('billing');      // this clears any settings overlay
		setSettingsTab('shop');  // reset tab
	};

	const closeDay = () => {
		printSummary();
		setView('home');
		setCart([]);
	};

	const CUT_COMMAND = '\x1D\x56\x00';

	const printOrder = () => {
  if (!cart.length) return;

  const id = uuidv4().slice(0, 6);
  const time = new Date().toLocaleTimeString();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const customer = [
    `${settings.shop}`,
    `Cashier: ${settings.cashier}`,
    `Order ${id} @ ${time}`,
    ...cart.map(i => `${i.name} x${i.qty} = ₹${i.price * i.qty}`),
    `Total ₹${total}`,
    '',
    '-----CUT HERE-----',
  ].join('\n') + CUT_COMMAND; // <-- Add cut command here

  const kitchen = [
    `KITCHEN COPY`,
    `Order ${id} @ ${time}`,
    ...cart.map(i => `${i.name} x${i.qty}`),
    '',
    '-----CUT HERE-----',
  ].join('\n') + CUT_COMMAND; // <-- Add cut command here

  // Use Electron printer API if available, else fallback to console
  if (window.electronAPI?.printToPrinter) {
    if (customerPrinter) {
      window.electronAPI.printToPrinter(customerPrinter, customer);
    } else {
      alert('No customer printer selected in settings.');
    }
    if (kitchenPrinter) {
      window.electronAPI.printToPrinter(kitchenPrinter, kitchen);
    } else {
      alert('No kitchen printer selected in settings.');
    }
  } else {
    // Browser mode
    console.log('Customer Receipt Preview:\n' + customer);
    console.log('Kitchen Receipt Preview:\n' + kitchen);
    alert("Browser mode: Receipt logged to console.");
  }

  const newSale = { id, time, items: cart, total };
  const updated = [...sales, newSale];

  if (window.electronAPI?.writeSales) {
    window.electronAPI.writeSales(salesFile, updated);
  } else {
    console.log('Sales saved (browser simulation):', updated);
  }

  setSales(updated);
  setCart([]);
};

	const printSummary = () => {
		if (window.electronAPI?.printShiftSummary) {
			window.electronAPI.printShiftSummary(sales);
		} else {
			const total = sales.reduce((sum, o) => sum + o.total, 0);
			const summary = `
SHIFT SUMMARY
Date: ${new Date().toLocaleDateString()}
Orders: ${sales.length}
Total: ₹${total}
------------- END -------------
			`;
			console.log(summary);
			alert("Shift Summary preview printed to console (Browser mode).");
		}
	};

	const saveSettings = () => {
		setSettings({ ...settings, shop: shopName, cashier: cashierName, printer: posName });
		setShowSettings(false);
	};

	const savePrinterSettings = () => {
		// Save printer settings as needed
		setShowSettings(false);
	};

	return (
		<>
			<div className="particles">
  {Array.from({ length: 20 }).map((_, i) => (
    <span
      key={i}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${8 + Math.random() * 10}s`,
      }}
    />
  ))}
</div>

			{view === 'login' && (
  <div
    className="login-screen"
    style={{
      backgroundImage: `url(${loginBg})`,  // ✅ using imported image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div className="login-box">
      <h2>Welcome to Lassi Day Billing</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <div className="button-row">
        <button onClick={login}>Login</button>
        <button onClick={() => setPw('')}>Clear</button>
      </div>
      <div className="login-footer">
        Created by Jose Mathews  
        <br />
        📧 mathewsjose1212@gmail.com  
        <br />
        📞 9400276461
      </div>
    </div>
  </div>
)}


			{view === 'home' && (
  <div className="main-menu">
    <button onClick={openDay}>📅<br />Open Day</button>
    <button onClick={printSummary}>🧾<br />Summary</button>
    <button onClick={() => setView('settings')}>🛠️<br />Settings</button>
    <button onClick={closeDay}>🔒<br />Close Day</button>
  </div>
)}

			{view === 'settings' && (
  <div className="screen">
    <h2>Settings</h2>
    <div className="tab-buttons">
      <button
        onClick={() => setActiveSettingsTab('shop')}
        className={activeSettingsTab === 'shop' ? 'active' : ''}
      >
        Shop Details
      </button>
      <button
        onClick={() => setActiveSettingsTab('printer')}
        className={activeSettingsTab === 'printer' ? 'active' : ''}
      >
        Printer Settings
      </button>
    </div>

    {activeSettingsTab === 'shop' && (
      <div className="tab-content">
        <input
          placeholder="Shop Name"
          value={settings.shop}
          onChange={e => setSettings({ ...settings, shop: e.target.value })}
        />
        <input
          placeholder="Cashier Name"
          value={settings.cashier}
          onChange={e => setSettings({ ...settings, cashier: e.target.value })}
        />
        <input
          placeholder="Location"
          value={settings.location || ''}
          onChange={e => setSettings({ ...settings, location: e.target.value })}
        />
      </div>
    )}

    {activeSettingsTab === 'printer' && (
      <div className="tab-content">
        <h3>Customer Printer</h3>
        <select value={customerPrinter} onChange={e => setCustomerPrinter(e.target.value)}>
          {availablePrinters.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
        <input
          value={customerPaperWidth}
          onChange={e => setCustomerPaperWidth(e.target.value)}
          placeholder="Paper Width (e.g., 58mm)"
        />

        <h3>Kitchen Printer</h3>
        <select value={kitchenPrinter} onChange={e => setKitchenPrinter(e.target.value)}>
          {availablePrinters.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
        <input
          value={kitchenPaperWidth}
          onChange={e => setKitchenPaperWidth(e.target.value)}
          placeholder="Paper Width (e.g., 58mm)"
        />
      </div>
    )}

    <button onClick={() => setView('home')}>Save & Back</button>
  </div>
)}

			{view === 'billing' && (
				<div className="billing">
					<div className="sidebar">
						{/* Sidebar categories */}
						{fullMenu.map(catObj => (
							<button
								key={catObj.category}
								onClick={() => setSelectedCat(catObj.category)}
							>
								{catObj.category}
							</button>
						))}
					</div>
					<div className="items">
						{/* Items grid */}
						{selectedCat &&
							fullMenu
								.find(catObj => catObj.category === selectedCat)
								?.items.map(item => (
									<button
										key={item.name}
										onClick={() => {
											const found = cart.find(i => i.name === item.name);
											if (found) found.qty++;
											else cart.push({ ...item, qty: 1 });
											setCart([...cart]);
										}}
									>
										{`${item.name}\n₹${item.price}`}
									</button>
								))}
					</div>
					<div className="cart">
						<h3>Cart</h3>
						{cart.map((i, idx) => (
							<div key={idx}>
								{i.name} x{i.qty}
								<button
									onClick={() => {
										if (i.qty > 1) i.qty--;
										else cart.splice(idx, 1);
										setCart([...cart]);
									}}
								>
									−
								</button>
								<button
									onClick={() => {
										i.qty++;
										setCart([...cart]);
									}}
								>
									+
								</button>
							</div>
						))}
						<button onClick={printOrder}>Print Receipt (F5)</button>
						<button onClick={() => setCart([])}>Clear Cart</button>
						<button onClick={closeDay}>End Shift (F4)</button>
					</div>
				</div>
			)}

			{view === 'summary' && (
				<div className="screen">
					<h2>Shift Summary</h2>
					<div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto', background: '#111', padding: '20px', borderRadius: '10px' }}>
						<p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
						<p><strong>Shop:</strong> {shopName}</p>
						<p><strong>Cashier:</strong> {cashierName}</p>
						<p><strong>Total:</strong> ₹{sales.reduce((sum, o) => sum + o.total, 0)}</p>
						<p><strong>Orders:</strong> {sales.length}</p>
						<p><strong>Total Orders:</strong> {sales.length}</p>
						<p><strong>Total Sales:</strong> ₹{sales.reduce((sum, s) => sum + s.total, 0)}</p>
						<button onClick={printSummary}>🖨 Print Summary</button>
					</div>
					<button onClick={() => setView('home')}>🔙 Back</button>
				</div>
			)}
		</>
	);
}

export default App;