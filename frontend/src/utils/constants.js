const apiOptions = {
  url: 'https://mesto.nomoreparties.co/v1',
  cohortID: 'cohort-52',
  headers: {
    authorization: '05c6cfbb-e2ef-41b5-87c6-d47779894c52',
    'Content-Type': 'application/json'
  },
}

const apiAuthOptions = {
  url: 'https://api.mesto-vsevolodk.nomoredomains.rocks',
  // url: 'https://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
}

export {
  apiOptions,
  apiAuthOptions
};