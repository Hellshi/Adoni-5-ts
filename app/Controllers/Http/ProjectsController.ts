/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async store({ request, auth }: HttpContextContract) {
    const { id } = await auth.use('api').authenticate()
    console.log(id)
    const data = request.all()
    const project = await Project.create({ ...data, user_id: id })
    return project
  }

  public async index({ request }: HttpContextContract) {
    const { id } = request.param
    const projects = await Project.findByOrFail('id', id)

    return projects
  }
}
