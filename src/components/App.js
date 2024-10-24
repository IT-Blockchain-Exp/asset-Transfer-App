import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wallet from './Wallet';
import TransferHistory from './TransferHistory';
import './../index';

const App = () => {
  const [account, setAccount] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wallet account={account} setAccount={setAccount} />} />
        <Route path="/transfer-history" element={<TransferHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
