import nodemailer from 'nodemailer'

import type { Transporter } from 'nodemailer'

class EmailService_class {
	private transporter: Transporter
	
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

	private getMailTemplate = (url: string) => {
		const template = `
			<div>
				<h1>Для активации перейдите по ссылке</h1>
				<a href="${url}">${url}</a>
			</div>
		`
		
		return template
	}

	public async sendActivationMail(email: string, url: string) {
		console.log('this is current email', email)

		await this.transporter.sendMail({
			from: process.env.SMTP_NAME,
			to: email,
			subject: `Активация аккаунта на ${process.env.API_URL}`,
			text: '',
			html: this.getMailTemplate(url)
		})
	}
}

export const EmailService = new EmailService_class()
