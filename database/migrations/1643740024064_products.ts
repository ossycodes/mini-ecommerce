import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('user_id', 10)
      .unsigned()
      .references('users.id')
      table
      .integer('product_category_id', 10)
      .unsigned()
      .references('product_categories.id')
      .onDelete('CASCADE') // delete product_category when product is deleted
      .nullable()
      table
      .integer('product_sub_category_id', 10)
      .unsigned()
      .references('product_sub_categories.id')
      .onDelete('CASCADE') // delete product_sub_category when product is deleted
      .nullable()
      table.string('title', 250).nullable()
      table.text('description');
      table.string('address', 250).nullable();
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
