const queryString = require('query-string'); 
const apiUrl = 'http://localhost:3000';

const searchRemedy = async (searchText, signal) => {
  console.log(searchText);
  try{
    let response = await fetch(apiUrl + '/api/search/remedy/', {
        method: 'POST',
        signal: signal,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded',//'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: queryString.stringify(searchText)
      })
    return await response.json();
  }
  catch(err){
      console.log(err);
      return err;
  }
}

const searchDoctors = async (searchText, signal) => {
  console.log(searchText);
  try{
    let response = await fetch(apiUrl + '/api/search/doctors/', {
        method: 'POST',
        signal: signal,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded',//'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: queryString.stringify(searchText)
      })
    return await response.json();
  }
  catch(err){
      console.log(err);
      return err;
  }
} 
 
export {
  searchRemedy,
  searchDoctors
}