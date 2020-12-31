const apiUrl = 'http://localhost:3000';

const search = async (searchText) => {
  try {
    let response = await fetch(apiUrl + '/api/search/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchText)
    })
    return await response.json();

  } catch(err) {
    console.log(err)
  }
}