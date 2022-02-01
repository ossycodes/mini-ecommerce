import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductCategories extends BaseSchema {
  protected tableName = 'product_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
      table.boolean('status').defaultTo(false)
      table.datetime('created_at', { useTz: true }).defaultTo(this.now()) //remember to set to nullable
      table.datetime('updated_at', { useTz: true }).defaultTo(this.now()) //remember to set to nullable
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
