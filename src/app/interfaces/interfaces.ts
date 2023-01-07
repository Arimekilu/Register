export interface Payment {
  value: string | number,
  date: Date,
  comment?: string
  id?: string
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string,
}

export interface User {
  email: string,
  password: string,
  returnSecureToken: boolean
}
