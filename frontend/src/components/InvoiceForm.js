// frontend/src/components/InvoiceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './InvoiceForm.css';

function InvoiceForm({ onAddInvoice }) {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('draft');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!clientName) newErrors.clientName = 'Client name is required';
    if (!amount) newErrors.amount = 'Amount is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', { clientName, amount, status });
      onAddInvoice(response.data);
      setClientName('');
      setAmount('');
      setStatus('draft');
      setErrors({});
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>Create Invoice</h2>
      <div className="form-group">
        <label>Client Name:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        {errors.clientName && <span className="error">{errors.clientName}</span>}
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <button type="submit">Create Invoice</button>
    </form>
  );
}

export default InvoiceForm;