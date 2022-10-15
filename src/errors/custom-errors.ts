export const customErrors = {
  //400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'User is already registered',
    customCode: 4001
  },
  BAD_REQUEST_MOVIE_REGISTERED: {
    message: 'Movie is already registered',
    customCode: 4001
  },
  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present'
  },
  BAD_REQUEST_PASSWORDS_NO_EQUAL: {
    message: 'passwords not equal'
  },
  //401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token'
  },

  //403
  //404
  NOT_FOUND: {
    message: 'Record not found'
  }

};
