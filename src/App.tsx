import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { CustomerList, CustomerForm } from './page/customer';
import Header from './page/Header';
import HomePage from './page/home/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body>
          <Container fluid="md">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/form" element={<CustomerForm />} />
            </Routes>
          </Container>
        </body>
      </div>
    </Router>
  );
}

export default App;
