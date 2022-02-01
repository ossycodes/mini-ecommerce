import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory';
import CreateProductSubCategoryValidator from 'App/Validators/CreateProductSubCategoryValidator';

export default class ProductSubCategoriesController {

    public async index({ response }: HttpContextContract) {
        const subCategories = await ProductSubCategory.query().preload('category')
        return response.status(200).send(subCategories);
    }

    public async show({ request, response }: HttpContextContract) {
        
        const subCategory = await ProductSubCategory.query().where('id', request.param('id')).preload('category')

        if(subCategory.length === 0) {
            return response.status(404).send({
                message: 'subcategory not found'
            })
        }

        return response.status(200).send(subCategory);
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateProductSubCategoryValidator)
       
        let category = await ProductCategory.findOrFail(request.input('product_category_id', 0))

        const subCategory =  await ProductSubCategory.create({
            name: payload.name,
            status: payload.status || false,
            ProductCategoryId: category.id
        });

        return response.created(subCategory);
    }
}
