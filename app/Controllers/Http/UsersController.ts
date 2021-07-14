import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsesController {
  public async store({ request }: HttpContextContract) {
    const { email, name, password } = request.all()
    const user = await User.create({
      email,
      name,
      password,
    })
    return user
  }

  public async session({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const user = await auth.use('api').attempt(email, password, {
      expiresIn: '7days',
    })

    return user
  }

  public async index({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    console.log(auth.user)
    return `Hello user! Your email address is ${user.email}`
  }
}
