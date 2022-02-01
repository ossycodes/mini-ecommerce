import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory';
import CreateProductSubCategoryValidator from 'App/Validators/CreateProductSubCategoryValidator';

export default class ProductSubCategoriesController {

    public async index() {
        const categories = await ProductSubCategory.query().paginate(10)
        
        return categories;
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateProductSubCategoryValidator)

        let category = await ProductCategory.find(request.input('product_category_id'))
        if (!category) {
            return response.status(422).send({
                'message': 'product category not found'
            });
        }

        const subCategory = await category.related('sub_categories').create(payload)
        return response.created(subCategory);
    }
}
