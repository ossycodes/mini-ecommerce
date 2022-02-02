import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory';
import CreateProductSubCategoryValidator from 'App/Validators/CreateProductSubCategoryValidator';

export default class ProductSubCategoryRepository {
    
    async index(response) {
        const subCategories = await ProductSubCategory.query().preload('category')
        return response.status(200).send(subCategories);
    }

    async show(request, response) {
        const subCategory = await ProductSubCategory.query().where('id', request.param('id')).preload('category')

        if(subCategory.length === 0) {
            return response.status(404).send({
                message: 'subcategory not found'
            })
        }

        return response.status(200).send(subCategory);
    }

    async store(request, response) {
        const payload = await request.validate(CreateProductSubCategoryValidator)
       
        let category = await ProductCategory.findOrFail(request.input('product_category_id', 0))

        const subCategory =  await ProductSubCategory.create({
            name: payload.name,
            status: payload.status || false,
            ProductCategoryId: category.id
        });

        return response.created(subCategory);
    }


    async destroy(request, response) {
        const subCategory = await ProductSubCategory.query().where('id', request.param('id')).first()
        
        if(!subCategory) {
            return response.status(404).send({
                message: 'subcategory not found'
            })
        }

        await subCategory.delete()

        return response.status(200).send(subCategory);
    }

}
