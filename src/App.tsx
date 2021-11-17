import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import CustomerList from './page/CustomerList';
import Header from './page/Header';
import HomePage from './page/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <Container fluid="md">
          <HomePage />
          {/* <CustomerList /> */}
        </Container>
      </body>
    </div>
  );
}

export default App;
