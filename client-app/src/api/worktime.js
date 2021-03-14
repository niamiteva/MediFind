const apiUrl = 'http://localhost:3000';

const createWorktime = async (credentials, worktime) => {
  try {
      let response = await fetch(apiUrl + '/api/remedylists/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(worktime)
      })
    return await response.json()
  } catch(err) {
    console.error();
  }
};

export {
  createWorktime,
}