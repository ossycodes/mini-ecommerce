import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductSubCategoryRepository from 'App/Repositories/ProductSubCategoryRepository';
export default class ProductSubCategoriesController {

    subCategoryRepo

    constructor() {
        this.subCategoryRepo = new ProductSubCategoryRepository();
    }

    public async index({ response }: HttpContextContract) {
        return await this.subCategoryRepo.index(response);
    }
    
    public async show({ request, response }: HttpContextContract) {
        return await this.subCategoryRepo.show(request, response);
    }

    public async store({ request, response }: HttpContextContract) {
        return await this.subCategoryRepo.store(request, response);
    }

    public async destroy({request, response}: HttpContextContract) {
        return await this.subCategoryRepo.destroy(request, response);
    }
}
