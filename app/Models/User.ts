import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

const enum Account {
  admin,
  customer
}

const enum Status {
  active,
  inactive
}

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
  public account_type: Account

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public contact_name: string

  @column()
  public address: string

  @column()
  public status: Status

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
