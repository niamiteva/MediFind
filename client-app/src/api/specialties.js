const apiUrl = 'http://localhost:3000';

const getAllSpecialties = async (signal) => {
  try {
    let response = await fetch(apiUrl + '/api/specialty/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
};

export {
  getAllSpecialties
}