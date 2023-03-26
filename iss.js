const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const message = ` Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(message), null);
    }
    
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
  });
  
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://ipwho.is/${ip}`, (error, body) => {
    if (error) {
      return callback(error, null);
    }
    //get body.body as we want key body in object
    const parsedData = JSON.parse(body.body);
    
    if (!parsedData.success) {
      const message = `Success status was ${parsedData.success}. Server message says: ${parsedData.message} when fetching for IP ${parsedData.ip}`;
      callback(Error(message), null);
      return;
    }
    
    const { latitude, longitude } = parsedData;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {

fetchMyIP((error, ip) => {
  if (error) {
    return callback(error, null);
  }

  fetchCoordsByIP(ip, (error, location) => {
    if (error) {
      return callback(error, null);
    }

    fetchISSFlyOverTimes(location, (error, times) => {
      if (error) {
        return callback(error, null);
      }

      callback(null, times);
    })
  })
})
  
};

module.exports = {nextISSTimesForMyLocation};

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };