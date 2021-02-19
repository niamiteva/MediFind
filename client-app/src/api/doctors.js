const apiUrl = 'http://localhost:3000';

const getAllDoctors = async (signal) => {
    try {
      let response = await fetch(apiUrl + '/api/doctors/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };

const getDoctorById = async(params, credentials, signal) => {
    try {
      let response = await fetch(apiUrl + '/api/doctors/' + params.doctorId, {
        method: 'GET',
        signal: signal,
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
  };

  const updateDoctor = async (params, credentials, doctor) => {
    try {
      let response = await fetch(apiUrl + '/api/doctors/' + params.doctorId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(doctor)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };
  

export {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
}