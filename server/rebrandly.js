const request = require("request");
const dotenv = require('dotenv');
dotenv.config();

const apiRequest = (endpoint, httpMethod, body, success, failure) => {
  request({
    uri: `https://api.rebrandly.com/v1/${endpoint}`,
    method: httpMethod,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.URL_SHORTENER_API_KEY
    }
  }, (err, response, body) => {
    if (err) failure(err);
    else success(JSON.parse(body));
  });
};

const createNewLink = (link, success, failure) => {
  apiRequest("links", "POST", link, success, failure);
};

exports.createNewLink = createNewLink;