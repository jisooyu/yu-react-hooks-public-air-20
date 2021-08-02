// prod.js
// 다음을  Heroku dashboard -> click settings -> Reveal Config Vars에 다음을 입력

// google client id of yu-air-quality-prod
// mongodb project : air-prod
// mongodb cluster: air-quality-prod
// heroku yu-emaily

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
