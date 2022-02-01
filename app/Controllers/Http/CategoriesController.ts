import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {
    public async index(ctx: HttpContextContract) {
        return [
            {
                id: 1,
                title: "Women's wear",
            },
            {
                id: 2,
                title: "Men's wear",
            },
        ]
    }
}
