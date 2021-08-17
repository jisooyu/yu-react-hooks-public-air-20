import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { fetchData } from '../actions';
import { useDispatch } from 'react-redux'
import { Container, Row } from 'reactstrap';
import DisplayCards from './DisplayCards';

const Display = () => {
   
    const dispatch = useDispatch()

    useEffect(()=> {
      dispatch(fetchData())
    },[])

    const airdata = useSelector(state => state.airdata)
        
    if (airdata){
        return (
            <div className="heading-menu">
            <h1 className="heading-h1">서울시 공기 정보</h1>
            <p className="heading-p">공기청정도 정보는 매시간마다 갱신됩니다. </p>
            <p className="heading-p">출처: 공공데이터포털</p>
                <Container>
                    <Row>
                        {
                            airdata.sort((a, b)=> a.time <= b.time ? 1:-1).map(
                                (air) =><DisplayCards { ...air } key={air._id} />
                            )
                        }
                    </Row>
                </Container>
                
        </div>        
        )
    }
    return <div> Loading... </div>
}

export default Display;
