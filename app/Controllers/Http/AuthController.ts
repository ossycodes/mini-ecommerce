import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator';
import RegistrationValidator from 'App/Validators/RegistrationValidator';

export default class AuthController {
    public async register({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(RegistrationValidator)

        const user = new User();
        user.username = payload.username;
        user.email = payload.email;
        user.password = payload.password;
        user.type = payload.type;
        user.first_name = payload.first_name;
        user.last_name = payload.last_name;
        user.address = payload.address;
        user.contact_number = payload.contact_number;
        user.status = payload.status;

        await user.save();

        const token = await auth.use('api').login(user, {
            expiresIn: '10 days',
        })

        return response.created({
            user,
            token: token.toJSON()
        })
    }

    public async login({auth, request, response }) {
        const payload = await request.validate(LoginValidator)

        const email = payload.email
        const password = payload.password

        try {
            const token = await auth.use('api').attempt(email, password)
            return response.status(200).send({
                user: auth.user,
                token: token.toJSON()
            })
        } catch {
            return response.badRequest('Invalid credentials')
        }

    }
}
