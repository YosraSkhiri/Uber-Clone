export const isLoggedIn = () => {
  return {
    type: 'ISLOGGEDIN'
  }
}

export const isLoggedOut = () => {
  return {
    type: 'ISLOGGEDOUT'
  }
}

export const setUserData = userData => {
  return {
    type: 'SETUSERDATA',
    payload: userData
  }
}
