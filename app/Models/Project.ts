import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Task from 'App//Models/Task'

export default class Project extends BaseModel {
  @hasOne(() => User, {
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>

  @hasMany(() => Task, {
    foreignKey: 'project_id',
  })
  public task: HasMany<typeof Task>

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
