import { body } from 'express-validator'

import { TUserKeys } from '../types/user.types'

export const validationMiddleWare = () => {
  const email: TUserKeys = 'email'
  const name: TUserKeys = 'name'
  const password: TUserKeys = 'password'

  return [
    body(email).isEmail(),
    body(name).matches(/\S{2,64}/gi),
    body(password).matches(/\S{8,32}/gi),
  ]
}
