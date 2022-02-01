import { DateTime } from 'luxon'
import { beforeSave, BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Product from './Product'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public remember_me_token: string | null

  @column()
  public type: "admin" | "customer"

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public contact_number: string

  @column()
  public address: string

  @column()
  public status: "active" | "inactive"

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
