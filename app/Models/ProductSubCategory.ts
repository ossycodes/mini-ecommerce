import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'

export default class ProductSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ProductCategoryId: number

  @column()
  public name: string

  @column()
  public status: boolean

  @belongsTo(() => ProductCategory, {
    foreignKey: 'ProductCategoryId',
  })
  public category: BelongsTo<typeof ProductCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
