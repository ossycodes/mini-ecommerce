import ProductCategory from "App/Models/ProductCategory";
import CreateProductCategoryValidator from "App/Validators/CreateProductCategoryValidator";
import UpdateProductCategoryValidator from "App/Validators/UpdateProductCategoryValidator";

export default class ProductCategoryRepository {

    async index(response) {
        const categories = await ProductCategory.query().paginate(1, 10)
        return response.status(200).send(categories);
    }

    async show(request, response) {
        const category = await ProductCategory.query().where('id', request.param('id')).first()

        if (!category) {
            return response.status(404).send({
                message: 'category not found'
            })
        }

        return response.status(200).send(category);
    }

    async store(request, response) {
        const payload = await request.validate(CreateProductCategoryValidator)

        const category = await ProductCategory.create({
            name: payload.name,
            status: payload.status,
        })

        return response.created(category);
    }

    async update(request, response) {
        const payload = await request.validate(UpdateProductCategoryValidator)
        let category = await ProductCategory.findOrFail(request.param('id'))

        category.name = payload.name
        category.status = payload.status || false

        await category.save()

        return response.status(204).send({});
    }

    async destroy(request, response) {
        const category = await ProductCategory.query().where('id', request.param('id')).first()

        if (!category) {
            return response.status(404).send({
                message: 'category not found'
            })
        }

        await category.delete()

        return response.status(200).send(category);
    }
}