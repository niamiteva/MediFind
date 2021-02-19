const apiUrl = 'http://localhost:3000';

const createRemedy = async (credentials, remedy) => {
  try {
      let response = await fetch(apiUrl + '/api/remedy/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(remedy)
      })
    return await response.json()
  } catch(err) {
    console.error();
  }
}

const getRemediesByListId = async (params, credentials, signal) => {
  try {
    let response = await fetch(apiUrl + '/api/remedy/' + params.listId, {
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
}

const editRemedy = async (params, credentials, remedy) => {
  try {
    let response = await fetch(apiUrl + '/api/remedylists/' + params.remedyId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(remedy)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
};

export {
  createRemedy,
  getRemediesByListId,
  editRemedy
}