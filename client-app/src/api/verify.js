const queryString = require('query-string'); 
const apiUrl = 'http://localhost:3000';

const verify = async (params) => {
  try {
    let response = await fetch(apiUrl + '/api/verification/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: queryString.stringify(params)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
};

export {
  verify
}