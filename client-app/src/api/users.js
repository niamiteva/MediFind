
  const createUser = async (user) => {
    try {
        let response = await fetch('/api/users/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };

const getAllUsers = async (signal) => {
    try {
      let response = await fetch('/api/users/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };

const getUserById = async(params, credentials, signal) => {
    try {
      let response = await fetch('/api/users/' + params.userId, {
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

  const updateUser = async (params, credentials, user) => {
    try {
      let response = await fetch('/api/users/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };

  // const remove = async (params, credentials) => {
  //   try {
  //     let response = await fetch('/api/users/' + params.userId, {
  //       method: 'DELETE',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + credentials.t
  //       }
  //     })
  //     return await response.json()
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  const login = async (user) => {
    try {
      let response = await fetch('/api/auth/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const logout = async () => {
    try {
      let response = await fetch('/api/auth/logout/', { method: 'GET' })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  login,
  logout
}