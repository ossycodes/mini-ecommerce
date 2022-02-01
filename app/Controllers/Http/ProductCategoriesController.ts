import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductCategoryRepository from 'App/Repositories/ProductCategoryRepository';
import CreateProductCategoryValidator from 'App/Validators/CreateProductCategoryValidator';
import UpdateProductCategoryValidator from 'App/Validators/UpdateProductCategoryValidator';

export default class ProductCategoriesController {

    categoryRepo

    constructor() {
        this.categoryRepo = new ProductCategoryRepository();
    }

    public async index({ response }: HttpContextContract) {
        return await this.categoryRepo.index(response);
    }

    public async show({ request, response }: HttpContextContract) {
        return await this.categoryRepo.show(request, response);
    }

    public async store({ request, response }: HttpContextContract) {
        return await this.categoryRepo.store(request, response);
    }

    public async update({ request, response }: HttpContextContract) {
        return await this.categoryRepo.update(request, response);
    }

    public async destroy({ request, response }: HttpContextContract) {
        return await this.categoryRepo.destory(request, response);
    }
}
