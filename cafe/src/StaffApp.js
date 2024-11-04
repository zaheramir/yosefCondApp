import React, { useState, useEffect } from 'react';
import './StaffApp.css'; // Use a separate CSS file for styling

function StaffApp() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('https://cafe-production.up.railway.app/get-orders');
      const data = await response.json();
      setOrders(data.filter(order => order !== null)); // Remove null items if any
    };

    fetchOrders();
  }, []);

  // Handle deleting an order
  const deleteOrder = async (index) => {
    const response = await fetch(`https://cafe-production.up.railway.app/delete-order/${index}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setOrders(orders.filter((_, i) => i !== index)); // Remove the order from the list
    } else {
      alert('Failed to delete order.');
    }
  };

  return (
    <div className="staff-container">
      <h1 className="staff-title">Current Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders have been placed yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h2>Order #{index + 1}</h2>
                <button onClick={() => deleteOrder(index)} className="delete-button">Delete Order</button>
              </div>
              <div className="order-details">
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      <strong>{item.item}</strong> with {item.extras.length > 0 ? item.extras.join(', ') : 'no extras'} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="total-price">Total: ${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StaffApp;
