import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import Application from '@ioc:Adonis/Core/Application'

export default class FilesController {
  public async store({ request }: HttpContextContract) {
    if (!request.file('file')) return

    const upload = request.file('file', { size: '2mb' })!

    const fileName = `${Date.now()}.${upload.subtype}`

    await upload.move(Application.tmpPath('uploads'), {
      name: fileName,
    })

    const file = await File.create({
      file: fileName,
      name: upload.clientName,
      type: upload.type,
      subtype: upload.subtype,
    })

    return file
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const file = await File.findByOrFail('id', id)
    return response.download(Application.tmpPath(`uploads/${file.file}`))
  }
}
