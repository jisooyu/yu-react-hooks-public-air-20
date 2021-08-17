import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

import { addData } from '../actions/index'

const AddForm = () => {
    const airdata = useSelector((state)=> state.airdata)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(addData(airdata))
    })

    const [dataFetched, setDataFetched] = useState(false)
    const [dataUpdated, setDataUpdated] = useState(false)
    const [dataStatus, setDataStatus] = useState("")
    const [location, setLocation] = useState("")
    const [error, setError] = useState("")

    const onLocationChange = ( e ) => {
        setLocation( e.target.value)
    }

    const onUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post( '/airdata/update', { location: location } )
            return setDataUpdated(true), setDataStatus("Data updated! Click Updage Button."), setLocation("")
        } catch ( error ) {
            return setDataUpdated(false), setDataStatus("No data to update!"), setError("data not updated")
        }
    }

    const onAddClick = async () => {
            const res = await axios.get('/airdata/display')
            const airdata = res.data
            if(airdata){
                setDataFetched(true)
                setLocation("")
                return dispatch(addData(airdata))
            }
            return setDataFetched(false), setDataStatus("Loading..............")
        }


    const renderUpdate = () => {
        if (dataUpdated){
            return <span id="renderBlue">{dataStatus}</span>
        } else {
            return <span id="renderRed">{dataStatus}</span>
        }
    }
             
    return (
        <div className="addForm">
            <Form onSubmit={onUpdateSubmit}>
                <FormGroup>
                <Label >Enter the location:{location}</Label>
                
                <Input onChange={onLocationChange} />
                <br></br>
                <p>UpdateDB Status:
                    {renderUpdate()}
                </p>
                {
                    dataFetched === false ? 
                    <Link to={'/display'}>
                        <Button color="primary" onClick={onAddClick} >Update Data</Button>{' '}
                    </Link>
                    : ""
                }
                </FormGroup>
            </Form>

            { dataUpdated === true && dataFetched === true ?
                    <p>Save Status: New Data Saved </p>
                : ""}
        </div>
    )  
}

export default  AddForm;

