export const AUTH_ERROR = {
  emailNotExist: (email: string) => `Пользователь с почтовым адерессом ${email} уже существует!`,
  notCorrectLink: 'Некорректная ссылка активации!',
  notCorrectPassword: 'Неправильный пароль!',
  userNotAuthorized: 'Пользователь не авторизован!',
  userNotFound: 'Пользователь с таким email не найден!',
  validationError: 'Ошибка при валидации',
}

export const COMMENT_ERROR = {
  notCorrectBody: 'Не коректное тело запроса!',
  commentNotFound: 'Комментарий не найден!',
}

export const SUBSCRIPTION_ERROR = {
  idNotBeEquals: 'Идентификаторы не могут быть равны!',
}

export const TOTAL_ERROR = {
  notCorrectId: 'Не коректный ID!',
}

export const VIDEO_ERROR = {
  videoNotFound: 'Видео не найденно!',
}
