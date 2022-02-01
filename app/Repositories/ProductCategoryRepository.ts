export default class ProductCategoryRepository {
    model;
    
    constructor(model){
        this.model = model;
      }

    async index(ctx, order = ['id', 'asc']) {
        //
    }

    async store(request, response) {
        //
    }

    async show(params, response) {
        //
    }


    async update(params, request, response) {
        //
    }


    async destroy(params, response) {
        //
    }
}