import nodemailer from 'nodemailer'

class EmailService {
	public transporter: any

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			service: 'gmail',
			requireTLS: true,
			auth: {
				user: process.env.SMTP_NAME,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}

	async sendActiovationMail(email: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_NAME,
			to: email,
			subject: `Активация аккаунта на ${process.env.API_URL}`,
			text: '',
			html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `
		})
	}
}

export default new EmailService()
