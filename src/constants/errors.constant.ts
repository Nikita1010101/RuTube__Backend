export const TOTAL_ERROR = {
  notCorrectId: 'Не коректный ID!',
}

export const AUTH_ERROR = {
  validationError: 'Ошибка при валидации',
  emailNotExist: (email: string) => `Пользователь с почтовым адерессом ${email} уже существует!`,
  userNotFound: 'Пользователь с таким email не найден!',
  notCorrectPassword: 'Неправильный пароль!',
  notCorrectLink: 'Некорректная ссылка активации!',
}

export const VIDEO_ERROR = {
  videoNotFound: 'Видео не найденно!',
}

export const COMMENT_ERROR = {
  notCorrectBody: 'Не коректное тело запроса!',
}

export const LIKE_ERROR = {}
