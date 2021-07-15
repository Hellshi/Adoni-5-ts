/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async store({ request, auth }: HttpContextContract) {
    const { id } = await auth.use('api').authenticate()

    const data = request.all()

    const project = await Project.create({ ...data, user_id: id })

    return project
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()
    const projects = await Project.findByOrFail('id', id)
    return projects
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const data = request.all()

    const project = Project.findByOrFail('id', id)
    const updated = (await project).merge(data).save()
    return updated
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.params()
    const project = Project.findByOrFail('id', id)
    await (await project).delete()

    return 'we will miss u :('
  }
}
