import { GET_USER_DATA } from './userTypes'


export const getUserData = (data) => {
    console.log("use daad ",data)
    
    return (dispatch) => {
       
        dispatch({ type: GET_USER_DATA, userData:data })
    }
}



