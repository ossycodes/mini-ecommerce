import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({
      escape: true,
      trim: true
    },
    [
      rules.maxLength(255)
    ]
    ),
    status: schema.boolean.optional(),
  })

  public messages = {}
}
