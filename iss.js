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

  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    
    const parsedData = JSON.parse(body);
    
    if (!parsedData.success) {
      const message = `Success status was ${parsedData.success}. Server message says: ${parsedData.message} when fetching for IP ${parsedData.ip}`;
      callback(Error(message), null);
      return;
    }
    
    const { latitude, longitude } = parsedData;
    callback(null, {latitude, longitude});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };