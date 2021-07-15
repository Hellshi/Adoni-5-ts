import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, computed } from '@ioc:Adonis/Lucid/Orm'
import Task from 'App//Models/Task'

export default class File extends BaseModel {
  @hasOne(() => Task, {
    foreignKey: 'file_id',
  })
  public task: HasOne<typeof Task>

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public subtype: string

  @column()
  public file: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
