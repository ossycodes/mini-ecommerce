import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductRepository from 'App/Repositories/ProductRepository';

export default class ProductsController {
    productRepo

    constructor() {
        this.productRepo = new ProductRepository();
    }

    public async index({ request, response }: HttpContextContract) {
        return await this.productRepo.index(request, response);
    }

    public async show({ request, response }: HttpContextContract) {
        return await this.productRepo.show(request, response);
    }

    public async store({ request, response, auth }: HttpContextContract) {
        return await this.productRepo.store(request, response, auth);
    }

    public async update({ request, response, auth }: HttpContextContract) {
        return await this.productRepo.update(request, response, auth);
    }

    public async destroy({ request, response }) {
        this.productRepo.destroy(request, response)
    }
}
