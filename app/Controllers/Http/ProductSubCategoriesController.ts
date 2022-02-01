import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory';
import CreateProductSubCategoryValidator from 'App/Validators/CreateProductSubCategoryValidator';

export default class ProductSubCategoriesController {

    public async index({ response }: HttpContextContract) {
        const subCategories = await ProductSubCategory.query().paginate(10)
        return response.status(200).send(subCategories);
    }

    public async show({ request, response }: HttpContextContract) {
        const subCategory = await ProductSubCategory.findOrFail(request.param('id'))
        return response.status(200).send(subCategory);
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateProductSubCategoryValidator)

        let category = await ProductCategory.findOrFail(request.input('product_category_id'))

        const subCategory = await category.related('sub_categories').create(payload)
        return response.created(subCategory);
    }
}
