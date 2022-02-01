import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegistrationValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    username: schema.string({
      escape: true,
      trim: true
    },
      [
        rules.maxLength(255)
      ]
    ),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [rules.confirmed(), rules.maxLength(180)]),
    first_name: schema.string({
      escape: true,
    },
      [
        rules.maxLength(255)
      ]
    ),
    last_name: schema.string({
      escape: true,
    },
      [
        rules.maxLength(255)
      ]
    ),
    contact_number: schema.string({
      escape: true,
      trim: true
    },
      [
        rules.maxLength(255)
      ]
    ),
    type: schema.enum(
      ['admin', 'customer'] as const
    ),
    status: schema.enum(
      ['active', 'inactive'] as const
    ),
    address: schema.string({},
      [
        rules.maxLength(255)
      ]
    ),
  })

  public messages = {}
}
