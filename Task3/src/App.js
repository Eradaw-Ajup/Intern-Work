
import * as React from 'react';
import './App.css';
import Asset from './Components/Asset';
import AssetForm from './Components/AssetForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
      <div>
      <Router>
      <Routes>

      <Route exact path="/" element={<Asset/>} />
      <Route path="/asset-form" element={<AssetForm/>} />

      </Routes>
      </Router>
      </div>

  );
}

export default App;
