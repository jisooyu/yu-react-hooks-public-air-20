const axios = require('axios');
const serviceKey = require( '../urlsKeys/key' )
const aqiUrl = require('../urlsKeys/url')

const axdata = async (stationName, callback) => {

  const fullurl = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=DAILY&numOfRows=1&ver=1.3&returnType=json&ServiceKey=g9faQvlMMszwEA639lFX1Y%2BcimFiC1qn8FkPQQ9FJQX3F0Ft%2FrLsYC%2BZrPTaRsKnrirK0lyGW%2BgI2DmLhguKQA==`

  try {
    const response = await axios.get(fullurl)
    // console.log(response.data.response.body.items[0].pm10Value)
    const data = response.data.response.body.items[0]
    const airdata = {
      location: stationName,
      time: data.dataTime,
      pm10: data.pm10Value,
      pm25: data.pm25Value,
      no2: data.no2Value
    }
    callback(undefined, {airquality:airdata})
  } catch (error) {
    console.log('error broke out:  ', error) 
  }  
}

module.exports = axdata;
