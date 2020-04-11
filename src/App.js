import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={ProductList}></Route>
      </Router>
    </div>
  );
}

export default App;
