const axios = require('axios');
const serviceKey = require( './config/key' )
const aqiUrl = require('./config/url')

const axdata = async (stationName, callback) => {
  // 공공데이터 포털의 api
  const url = aqiUrl.airUrl
  // 한국환경공단_에어코리아_대기오염정보 인증키
  // 주의: 다른 파일에서 인증키를 불러 올 때는 반드시  decode를 해야 함. 
  let ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)

  // axios로 한국환경공단_에어코리아_대기오염정보 api에 연결하여 데이터를 불러옴.
  try {
    const response = await axios.get(url, 
      { params: 
        {
          dataTerm: 'DAILY',
          stationName: stationName,
          pageNo: '1',
          numOfRows: '1',
          ver:'1.3',
          returnType: 'json',
          ServiceKey: ServiceKey}
      }
    )

    const {dataTime,pm10Value,pm25Value,no2Value} = response.data.response.body.items[0]
    console.log("response from axdata", response.data.response.body)
    const airdata = {
      location: stationName,
      time: dataTime,
      pm10: pm10Value,
      pm25: pm25Value,
      no2: no2Value
    }

    callback(undefined, {airquality:airdata})
  } catch (error) {
    console.log('error broke out:  ', error) 
  }  
}

module.exports = axdata;
