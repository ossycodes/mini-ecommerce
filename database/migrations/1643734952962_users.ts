import BaseSchema from '@ioc:Adonis/Lucid/Schema'


export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 255).nullable()
      table.string('email', 255)
      table.string('password', 180)
      table.string('remember_me_token', 255).nullable()
      table.enu('account_type', ['admin', 'customer'], {
        useNative: true,
        enumName: 'users_type_enum',
        existingType: false,
      })
      table.string('first_name', 255).nullable()
      table.string('last_name', 255).nullable()
      table.string('contact_number', 255).nullable()
      table.text('address');
      table.enu('status', ['active', 'inactive'], {
        useNative: true,
        enumName: 'users_status_enum',
        existingType: false,
      }).defaultTo('inactive')
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })
  }

  public async down() {
    // this.schema.raw('DROP TYPE IF EXISTS "users_type_enum"')
    // this.schema.raw('DROP TYPE IF EXISTS "users_status_enum"')
    this.schema.dropTable(this.tableName)
  }
}
