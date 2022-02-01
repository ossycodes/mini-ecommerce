import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ProductCategory from './ProductCategory'
import ProductSubCategory from './ProductSubCategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public ProductCategoryId: number

  @column()
  public ProductSubCategoryId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public address: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => ProductCategory)
  public category: BelongsTo<typeof ProductCategory>

  @belongsTo(() => ProductSubCategory)
  public sub_category: BelongsTo<typeof ProductSubCategory>
}
