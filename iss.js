const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API

  const request = require('request');

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
  
  }

module.exports = { fetchMyIP };