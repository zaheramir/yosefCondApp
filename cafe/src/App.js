import React, { useState } from 'react';
import './App.css';
import steakImage from './steak.jpg';

function App() {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [showExtras, setShowExtras] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addToOrder = (extras) => {
    let basePrice = 25;
    let extraPrice = extras.includes('Chips') || extras.includes('Salad') ? extras.length * 1 : 0;
    let totalPrice = basePrice + extraPrice;

    setOrder([...order, { item: 'סטיק', extras: extras, price: totalPrice }]);
    setTotal(total + totalPrice);
    setShowExtras(false);
  };

  const removeFromOrder = (index) => {
    const itemToRemove = order[index];
    setTotal(total - itemToRemove.price);
    setOrder(order.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const extras = [];
    if (form.chips.checked) extras.push('Chips');
    if (form.salad.checked) extras.push('Salad');
    addToOrder(extras);
  };

  const submitOrder = async () => {
    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const orderData = {
      name, // Include the name in the order data
      phone, // Include the phone in the order data
      items: order,
      total: total.toFixed(2),
    };

    const response = await fetch('https://cafe-production.up.railway.app/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert('Order submitted successfully!');
      setOrder([]);
      setTotal(0);
      setName('');  // Reset name field after submission
      setPhone('');  // Reset phone field after submission
    } else {
      alert('Failed to submit order.');
    }
  };

  return (
    <div className="App">
      <div className="menu-section">
        <div className="menu">
          <h1>Menu</h1>
          <div className="menu-item">
            <img src={steakImage} alt="סטיק" className="steak-image" />
            <div>
              <h2>סטיק - $25</h2>
              <button onClick={() => setShowExtras(!showExtras)} className="add-button">+</button>
            </div>
          </div>

          {showExtras && (
            <form onSubmit={handleSubmit} className="extras-form">
              <label>
                <input type="checkbox" name="chips" /> Chips (+$1)
              </label>
              <br />
              <label>
                <input type="checkbox" name="salad" /> Salad (+$1)
              </label>
              <br />
              <button type="submit" className="order-button">Add to Order</button>
            </form>
          )}
        </div>
      </div>

      <div className="order-section">
        <div className="order">
          <h1>Current Order</h1>
          <ul>
            {order.map((item, index) => (
              <li key={index}>
                {item.item} with {item.extras.length > 0 ? item.extras.join(', ') : 'no extras'} - ${item.price.toFixed(2)}
                <button onClick={() => removeFromOrder(index)} className="remove-button">Remove</button>
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toFixed(2)}</h2>

          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <br />
            <label>
              Phone:
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
          </div>

          {order.length > 0 && (
            <button onClick={submitOrder} className="submit-button">Submit Order</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
