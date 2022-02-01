import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_category_id: schema.number.optional(),
    product_sub_category_id: schema.number.optional(),
    title: schema.string({
      escape: true,
      trim: true
    },
    [
      rules.maxLength(250),
      rules.unique({ table: 'products', column: 'title' })
    ],
    
    ),
    description: schema.string({
      escape: true,
      trim: true
    },
    [
      rules.maxLength(255)
    ]
    ),
    address: schema.string({
      escape: true,
      trim: true
    },
    [
      rules.maxLength(250)
    ]
    )
  })

  public messages = {}
}
