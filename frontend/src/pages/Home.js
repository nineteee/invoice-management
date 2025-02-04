// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import './Home.css';

function Home() {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, [filterStatus]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/invoices${filterStatus ? `?status=${filterStatus}` : ''}`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleAddInvoice = async (invoice) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', invoice);
      setInvoices([...invoices, response.data]);
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  const handleUpdateInvoice = async (updatedInvoice) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/invoices/${updatedInvoice._id}`, updatedInvoice);
      setInvoices(invoices.map((invoice) => (invoice._id === response.data._id ? response.data : invoice)));
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      setInvoices(invoices.filter((invoice) => invoice._id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Invoices</h1>
      <div className="filter-container">
        <label>
          Filter by Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </label>
      </div>
      <InvoiceForm onAddInvoice={handleAddInvoice} />
      <InvoiceList
        invoices={invoices}
        onUpdateInvoice={handleUpdateInvoice}
        onDeleteInvoice={handleDeleteInvoice}
      />
    </div>
  );
}

export default Home;