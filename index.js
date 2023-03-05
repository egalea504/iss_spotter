const {fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('198.58.160.76', (error, coordinates) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Here are the coordinates:' , coordinates);
});