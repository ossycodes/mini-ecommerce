import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from "App/Models/Product";
import ProductCategory from 'App/Models/ProductCategory';
import ProductSubCategory from 'App/Models/ProductSubCategory';
import CreateProductValidator from 'App/Validators/CreateProductValidator';

export default class ProductsController {
    public async index({request, response}: HttpContextContract) {
        const products =  await Product.query().paginate(10)
        console.log(products);
        return response.status(200).send(products);
    }

    public async store({request, response, auth}: HttpContextContract) {
        const payload = await request.validate(CreateProductValidator)

        let productCategoryId = payload.product_category_id
        let productSubCategoryId = payload.product_sub_category_id

        if(productCategoryId) {
            await ProductCategory.findOrFail(productCategoryId);
        }

        if(productSubCategoryId) {
           await ProductSubCategory.findOrFail(productCategoryId);
        }
        
        const product = await Product.create({
            userId: auth.user?.id,
            ...payload
        });
        
        return response.created(product);
    }
}
