/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'

export default class TasksController {
  public async show({ request }: HttpContextContract) {
    const { Task_id } = request.params()

    const task = await Task.firstOrFail(Task_id)

    await task.load('projects', (queryProject) => {
      queryProject
    })

    await task.load('user', (queryProject) => {
      queryProject
    })
    return task
  }

  public async store({ request, auth }: HttpContextContract) {
    const { id } = await auth.use('api').authenticate()
    const { Project_id } = request.params()
    const data = request.all()

    const task = await Task.create({ ...data, user_id: id, project_id: Project_id })

    return task
  }

  public async delete({ request }: HttpContextContract) {
    const { Task_id } = request.params()
    await (await Task.findByOrFail('id', Task_id)).delete()
    return 'We will miss u'
  }

  public async update({ request }: HttpContextContract) {
    const { Task_id } = request.params()
    const data = request.all()

    const task = Task.findByOrFail('id', Task_id)
    const updated = (await task).merge(data).save()
    return updated
  }
}
