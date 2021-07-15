import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App//Models/Project'
import Task from 'App//Models/Task'

export default class User extends BaseModel {
  @hasMany(() => Project, {
    foreignKey: 'user_id',
  })
  public project: HasMany<typeof Project>

  @hasMany(() => Task, {
    foreignKey: 'user_id',
  })
  public task: HasMany<typeof Task>

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public email: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
