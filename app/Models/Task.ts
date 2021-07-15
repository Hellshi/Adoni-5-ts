import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import File from 'App/Models/File'
import Project from 'App/Models/Project'

export default class Task extends BaseModel {
  @hasOne(() => File, {
    foreignKey: 'id',
  })
  public file: HasOne<typeof File>

  @hasOne(() => Project, {
    foreignKey: 'id',
  })
  public project: HasOne<typeof Project>

  @hasOne(() => User, {
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public project_id: string

  @column()
  public user_id: string

  @column()
  public file_id: string

  @column()
  public due_date: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
