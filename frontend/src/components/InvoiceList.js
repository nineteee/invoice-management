// frontend/src/components/InvoiceList.js
import React from 'react';
import './InvoiceList.css';

function InvoiceList({ invoices, onUpdateInvoice, onDeleteInvoice }) {
  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedInvoice = await response.json();
      onUpdateInvoice(updatedInvoice);
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <div className="invoice-list">
      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        invoices.map((invoice) => (
          <div key={invoice._id} className="invoice-item">
            <h3>{invoice.clientName}</h3>
            <p>Amount: ${invoice.amount.toFixed(2)}</p>
            <p>Status: {invoice.status}</p>
            <div className="actions">
              <select
                value={invoice.status}
                onChange={(e) => handleStatusChange(invoice._id, e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
              <button onClick={() => onDeleteInvoice(invoice._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default InvoiceList;