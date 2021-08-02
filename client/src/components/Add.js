import React from 'react';
import axios from 'axios'
import { addData } from '../actions/index'
import { Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// store에 mongodb에서 불러온 데이터를 dispatch 
const Add = () => {
    const dispatch = useDispatch()
    const handleClick = async () => {
        const res = await axios.get( '/airdata/display' )
        const airdata = res.data
        console.log("from Add airdata", airdata)
        dispatch(addData(airdata));
    }
    return (
        <div>
            <Button variant="success" onClick={()=> handleClick() }>Add Data</Button>
        </div>
    )
}

export default Add;

