import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator';

export default class AuthController {
    public async register({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(RegisterationValidator)
        const user = await User.create(payload);
        const token = await auth.use('api').login(user, {
            expiresIn: '10 days',
        })
        return token.toJSON()
    }

    public async login({auth, request, response }) {
        const payload = await request.validate(LoginValidator)
        
        const email = payload.email
        const password = payload.password

        try {
            const token = await auth.use('api').attempt(email, password)
            return token.toJSON()
        } catch {
            return response.badRequest('Invalid credentials')
        }

    }
}
