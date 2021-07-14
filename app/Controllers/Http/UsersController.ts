import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import argon2 from 'argon2'
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
    const result = await argon2.verify(
      '$argon2id$v=19$t=3,m=4096,p=1$aD2pUnkyg6wNPFBTWRMm4g$9YpO41wG4Wsi8VvQLJbRnQYjbzfYRINOCoqAFetY6Y8',
      password
    )
    console.log(email, password)
    const user = await auth.use('api').attempt(email, password)
    return user
  }
}
