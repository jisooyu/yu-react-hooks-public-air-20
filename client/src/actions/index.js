import axios from 'axios'
import { FETCH_USER, FETCH_DATA, ADD_DATA} from './types'

export const fetchUser = () => (
    async ( dispatch ) =>{
        const res = await axios.get( '/api/current_user' )
        dispatch({ type: FETCH_USER, payload: res.data }) 
    }
)

export const fetchData = () => (
    async ( dispatch ) =>{
        const res = await axios.get( '/airdata/display' )
        dispatch({ type: FETCH_DATA, payload: res.data }) 
    }
)

// mongo data를 store에 dispatch
export const addData = ( airdata ) => ({
    type: ADD_DATA,
    payload: airdata
});
