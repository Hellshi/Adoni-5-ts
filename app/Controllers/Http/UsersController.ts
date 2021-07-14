import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsesController {
  public async index({ request }: HttpContextContract) {
    const { email, name, password } = request.all()
    const user = await User.create({
      email,
      name,
      password,
    })
    return user
  }
}
