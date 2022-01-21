import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

//setting up store with middleware and redux dev tools viewers
export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk),
    // other store enhancers if any
));

