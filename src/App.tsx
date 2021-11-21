import React from 'react';
// import './App.css';
import { Container } from 'react-bootstrap';
import { CustomerList, CustomerForm } from './page/customer';
import Header from './page/common/Header';
import HomePage from './page/home/HomePage';
import Login from './page/login/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <Container fluid="md">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/form" element={<CustomerForm />} >
              <Route path=":customerId" element={<CustomerForm />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Container>
      </body>
    </div>
  );
}

export default App;
