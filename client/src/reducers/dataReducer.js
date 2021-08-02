import { FETCH_DATA, ADD_DATA} from "../actions/types"

export default function dataReducer( state = null, action ) {
    switch ( action.type ) {
        case FETCH_DATA:
            return action.payload || false
        case ADD_DATA:
            return action.payload || false;
        default:
            return state
    }
}