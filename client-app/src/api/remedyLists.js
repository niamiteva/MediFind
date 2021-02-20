const apiUrl = 'http://localhost:3000';

const getRemedyListsByUserId = async(params, credentials, signal) => {
  try {
    let response = await fetch(apiUrl + '/api/remedylists/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
    })
    return await response.json()
  } catch(err) {
    console.error(err)
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
    console.error();
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
}

const deleteRemedyList = async (params, credentials) => {
  try {
    let response = await fetch('/api/remedylist/' + params.listId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  getRemedyListsByUserId,
  createList,
  editList,
  deleteRemedyList
}