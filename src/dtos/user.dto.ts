export class UserDto {
  public id: number
  public email: string
  public name: string
  public description: string
  public avatarUrl: string

  constructor(user: any) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.description = user.description
    this.avatarUrl = user.avatarUrl
  }
}
