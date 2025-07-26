import { useState, useEffect } from "react";
import Sidebar from "./tools/sidebar";

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function InputPage() {
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [income, setIncome] = useState("");
  const [transactionDate, setTransactionDate] = useState(getTodayString()); // sets transation date to current date as default
  const [transactionLog, setTransactionLog] = useState([]); 

  useEffect(() => { // when the page loads it runs
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || []; // gets local storage data
    setTransactionLog(savedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))); // updates transaction log
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const locations = JSON.parse(localStorage.getItem("locations")) || [];

    if (cost && item) {
      locations.push({ lat: 53.3498, lng: -6.2603, label: `${item} (€${cost})` }); // adds location to map (hardcoded for now)
      transactions.push({ // adds new expense transaction
        id: new Date().getTime(), // creates a unique time id 
        description: item,
        location: location,
        amount: parseFloat(cost),
        type: 'expense',
        date: new Date(transactionDate).toISOString(),
      });
    }

    if (income) {
      transactions.push({ // adds new income transaction
        id: new Date().getTime() + 1,
        description: 'Income',
        location: 'N/A', // not needed 
        amount: parseFloat(income),
        type: 'income',
        date: new Date(transactionDate).toISOString(),
      });
    }

    localStorage.setItem("transactions", JSON.stringify(transactions)); // saves all lists to local storage
    localStorage.setItem("locations", JSON.stringify(locations));
    

    setTransactionLog(transactions.sort((a, b) => new Date(b.date) - new Date(a.date))); // shows all new transations

    alert("Entry saved!"); // resets entry from
    setItem("");
    setLocation("");
    setCost("");
    setIncome("");
    setTransactionDate(getTodayString());
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <h1>Add a New Entry </h1>
        <form onSubmit={handleSubmit} className="input-form">
          <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} required />
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="What did you buy?" />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where did you buy it?" />
          <input type="number" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="How much did it cost? (€)" />
          <input type="number" step="0.01" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Add any income (€)" />
          <button type="submit">Add</button>
        </form>

        {/* Transaction Log Section */}
        <div className="transaction-log">
          <h2>Transaction History</h2>
          {transactionLog.length > 0 ? (
            transactionLog.map((t) => (
              <div key={t.id} className={`log-item ${t.type}`}>
                <div className="log-details">
                  <strong>{t.description}</strong>
                  <small>{new Date(t.date).toLocaleDateString()}</small>
                  {t.type === 'expense' && <small>at {t.location}</small>}  {/* location shown on expense only */}
                </div>
                <div className="log-amount"> {/* expense is negative and icome is positive */}
                  {t.type === 'expense' ? `-€${t.amount.toFixed(2)}` : `+€${t.amount.toFixed(2)}`}
                </div>
              </div>
            ))
          ) : (
            <p>No transactions yet. Add one to see it appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}