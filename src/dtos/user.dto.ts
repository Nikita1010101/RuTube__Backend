export class UserDto {
	public id: number
	public email: string
	public name: string
	public description: string
	public avatarPath: string
	public isActivated: boolean
	public activationLink: string

	constructor(user: any) {
		this.id = user.id
		this.email = user.email
		this.name = user.name
		this.description = user.description
		this.avatarPath = user.avatarPath
		this.isActivated = user.isActivated
		this.activationLink = user.activationLink
	}
}
