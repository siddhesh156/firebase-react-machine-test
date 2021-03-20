import { GET_USER_DATA,GET_USER_IMG } from './userTypes'

const initialState = {
    userData: [],
    imgUrl: "",

}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
           
                return {
                    ...state,
                    userData: action.userData
            }

        case GET_USER_IMG:
        
            return {
                ...state,
                imgUrl: action.imgUrl
        }

        default: return state   

}

}

export default userReducer