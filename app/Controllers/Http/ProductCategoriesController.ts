import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import CreateProductCategoryValidator from 'App/Validators/CreateProductCategoryValidator';

export default class ProductCategoriesController {

    public async index() {
        const categories = await ProductCategory.query().paginate(1)
        return categories;
    }

    public async store({request, response}:HttpContextContract) {
        const payload = await request.validate(CreateProductCategoryValidator)
       
        const category = await ProductCategory.create({
            name: payload.name,
            status: payload.status,
        })

        return response.created(category);
    }
}
