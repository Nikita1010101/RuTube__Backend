export interface IBodyLogin {
  email: string
  password: string
}

export interface IBodyRegistration extends IBodyLogin {
  name: string
}