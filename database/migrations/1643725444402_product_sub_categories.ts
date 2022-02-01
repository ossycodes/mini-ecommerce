import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductSubCategories extends BaseSchema {
  protected tableName = 'product_sub_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
      table.boolean('status').defaultTo(false)
      table
      .integer('product_category_id', 10)
      .unsigned()
      .references('product_categories.id')
      .onDelete('CASCADE') // delete product_sub_category when product_category is deleted
      .nullable()
      table.datetime('created_at', { useTz: true }).defaultTo(this.now()) //remember to set to nullable
      table.datetime('updated_at', { useTz: true }).defaultTo(this.now()) //remember to set to nullable
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
