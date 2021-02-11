const apiUrl = 'http://localhost:3000';

const getRemedyListsByUserId = async(userId, credentials, signal) => {
  try {
    let response = await fetch(apiUrl + '/api/remedylists/', {
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

const createList = async (credentials, list) => {
  debugger;
  try {
      let response = await fetch(apiUrl + '/api/remedylists/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(list)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
};

const editList = async (params, credentials, list) => {
  try {
    let response = await fetch(apiUrl + '/api/remedylists/' + params.listId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(list)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
};

export {
  getRemedyListsByUserId,
  createList,
  editList
}