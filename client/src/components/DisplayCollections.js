import React from 'react'

const DisplayCollections = ( { location, time, pm10, pm25, no2 } ) => {
  return (
      <div>
          <ul className="collection">
            <li className="collection-item">location: { location }</li>
            <li className="collection-item">time: { time }</li>
            <li className="collection-item">pm10: { pm10 } ㎍/m³</li>
            <li className="collection-item">pm2.5: { pm25 } ㎍/m³</li>
            <li className="collection-item">no2: { no2 } ㎍/m³</li>
        </ul>
      </div>
  )
}
          
export default DisplayCollections;