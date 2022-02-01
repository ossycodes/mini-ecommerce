import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import ProductSubCategory from './ProductSubCategory'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({
    serialize: (value) => {
      return Boolean(value);
    }
  })
  public status: boolean

  @hasMany(() => ProductSubCategory)
  public sub_categories: HasMany<typeof ProductSubCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
