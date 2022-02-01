import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import CreateProductCategoryValidator from 'App/Validators/CreateProductCategoryValidator';
import UpdateProductCategoryValidator from 'App/Validators/UpdateProductCategoryValidator';

export default class ProductCategoriesController {

    public async index({response}: HttpContextContract) {
        const categories = await ProductCategory.query().paginate(10)
        return response.status(200).send(categories);
    }

    public async show({request, response}: HttpContextContract) {
        const category = await ProductCategory.findOrFail(request.param('id'))
        return response.status(200).send(category);
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateProductCategoryValidator)

        const category = await ProductCategory.create({
            name: payload.name,
            status: payload.status,
        })

        return response.created(category);
    }

    public async update({ request, response }: HttpContextContract) {
        const payload = await request.validate(UpdateProductCategoryValidator)
        let category = await ProductCategory.findOrFail(request.param('id'))
        
        category.name = payload.name
        category.status = payload.status || false

        await category.save()

        return response.status(204).send({});
    }

    public async destroy({request, response}: HttpContextContract) {
        const category = await ProductCategory.findOrFail(request.param('id'))
        await category.delete()

        return response.status(200).send(category);
    }
}
