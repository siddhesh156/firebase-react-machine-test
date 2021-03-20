import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'

import rootReducer from './rootReducer'

const history = createBrowserHistory();


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export { store, history };