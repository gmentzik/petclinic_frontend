import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { CustomerList, CustomerForm } from './page/customer';
import Header from './page/common/Header';
import HomePage from './page/home/HomePage';
import Login from './page/login/Login';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from './reducers';
import { decreaseCount, increaseCount, resetCount } from './actions/counterActions';


const mapStateToProps = (state: State) => {
  console.log(state) // state
  return ({
    counterState: state.counterReducer,
    anotherState: state.anotherReducer,
    userState: state.userReducer
  })
}

const mapDispatchToProps = (dispatch: any) => {
  return ({
    increaseStoreCounter: () => {
      dispatch(increaseCount());
    },
    decreaseStoreCounter: () => dispatch(decreaseCount()),
    resetStoreCounter: () => dispatch(resetCount()),
  })
}

const App = (props: any) => {

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <Container fluid="md">
          <Routes>
            <Route path="/" element={
              <HomePage
                counterMessage={props.counterState.message}
                anotherMessage={props.anotherState.message}
                counterValue={props.counterState.count}
                anotherValue={props.anotherState.count}
                increaseStoreCounter={props.increaseStoreCounter}
                decreaseStoreCounter={props.decreaseStoreCounter}
                resetStoreCounter={props.resetStoreCounter}
              />
            } />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/form" element={<CustomerForm />} >
              <Route path=":customerId" element={<CustomerForm />} />
            </Route>
            <Route path="login" element={<Login
            />} />
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
      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
