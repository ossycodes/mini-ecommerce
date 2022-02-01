import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator';

export default class CategoriesController {

    public async index() {
        const categories = await Category.query().paginate(1)
        return categories;
    }

    public async store({request, response}:HttpContextContract) {
        const payload = await request.validate(CreateCategoryValidator)
       
        const category = await Category.create({
            name: payload.name,
            status: payload.status,
        })

        return response.created(category);
    }
}
