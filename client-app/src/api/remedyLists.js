const apiUrl = 'http://localhost:3000';

const getRemedyListsByUserId = async(userId, credentials, signal) => {
  try {
    let response = await fetch(apiUrl + '/api/remedyLists/', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(userId)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
};

export {
  getRemedyListsByUserId
}