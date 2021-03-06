import Product from "App/Models/Product";
import ProductCategory from "App/Models/ProductCategory";
import ProductSubCategory from "App/Models/ProductSubCategory";
import CreateProductValidator from "App/Validators/CreateProductValidator";

export default class ProductRepository {

    public async index(response) {
        const products = await Product.query().preload('category').preload('sub_category').paginate(1, 5)   
        return response.status(200).send(products);
    }

    public async show(request, response) {
        const product = await Product.query().where('id', request.param('id')).preload('category').preload('sub_category')

        if (product.length === 0) {
            return response.status(404).send({
                message: 'product not found'
            })
        }

        return response.status(200).send(product);
    }

    public async store(request, response, auth) {
        const payload = await request.validate(CreateProductValidator)

        let productCategoryId = payload.product_category_id
        let productSubCategoryId = payload.product_sub_category_id

        if (productCategoryId) {
            const category = await ProductCategory.query().where('id', productCategoryId).first()

            if (!category) {
                return response.status(404).send({
                    message: 'category not found'
                })
            }
        }

        if (productSubCategoryId) {
            const subCategory = await ProductSubCategory.query().where('id', productSubCategoryId).first()

            if (!subCategory) {
                return response.status(404).send({
                    message: 'subcategory not found'
                })
            }
        }

        const product = await Product.create({
            userId: auth.user?.id,
            ...payload
        });

        return response.created(product);
    }


    public  async update(request, response, auth) {
        const payload = await request.validate(CreateProductValidator)

        let productCategoryId = payload.product_category_id
        let productSubCategoryId = payload.product_sub_category_id

        if (productCategoryId) {
            const category = await ProductCategory.query().where('id', productCategoryId).first()

            if (!category) {
                return response.status(404).send({
                    message: 'category not found'
                })
            }
        }

        if (productSubCategoryId) {
            const subCategory = await ProductSubCategory.query().where('id', productSubCategoryId).first()

            if (!subCategory) {
                return response.status(404).send({
                    message: 'subcategory not found'
                })
            }
        }

        const product = await Product.findOrFail(request.param('id'));

        product.userId = auth.user?.id
        product.ProductCategoryId = productCategoryId || null
        product.ProductSubCategoryId = productSubCategoryId || null
        product.title = payload.title
        product.description = payload.description
        product.address = payload.address

        await product.save();

        return response.created(product);
    }

    public async destroy(request, response) {
        const product = await Product.query().where('id', request.param('id')).first()

        if (!product) {
            return response.status(404).send({
                message: 'product not found'
            })
        }

        await product.delete()

        return response.status(200).send(product);
    }

}
