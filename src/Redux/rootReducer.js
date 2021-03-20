import { combineReducers } from 'redux'
import userReducer from './UserDetails/userReducer'

const rootReducer = combineReducers({
    users: userReducer,
})

export default rootReducer