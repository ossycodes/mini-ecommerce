import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory';
import CreateProductSubCategoryValidator from 'App/Validators/CreateProductSubCategoryValidator';
import UpdateProductSubCategoryValidator from 'App/Validators/UpdateProductSubCategoryValidator';

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

    public async update({ request, response }: HttpContextContract) {

        const payload = await request.validate(UpdateProductSubCategoryValidator)

        let category = await ProductCategory.find(request.input('product_category_id'))

        if (!category) {
            return response.status(422).send({
                'message': 'product category not found'
            });
        }

        await ProductSubCategory
            .query()
            .where('id', request.param('id'))
            .update(payload)

        return response.status(204).send({});
    }

    public async destroy({ request, response }: HttpContextContract) {
        const category = await ProductCategory.findOrFail(request.param('id'))
        await category.delete()

        return response.status(200).send(category);
    }
}
