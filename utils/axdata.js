const axios = require('axios');
const serviceKey = require( '../urlsKeys/key' )
const aqiUrl = require('../urlsKeys/url')

const axdata = async (stationName, callback) => {
  
  const url = aqiUrl.airUrl
  let ServiceKey = serviceKey.publicPortalkey

  let queryParams =   encodeURIComponent('stationName') + '=' + encodeURIComponent(stationName);
  queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3');
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json')
  queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + ServiceKey

  const fullurl = url + queryParams;

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
