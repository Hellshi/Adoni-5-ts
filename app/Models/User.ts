import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, hasMany, HasMany, afterSave } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App//Models/Project'
import Mail from '@ioc:Adonis/Addons/Mail'
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

  @column()
  public token?: string

  @column()
  public token_created_at?: Date

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterSave()
  public static async sendEmail(user: User) {
    await Mail.send((message) => {
      message
        .from('Hell la hell')
        .subject('Welcome home!')
        .to(user.email)
        .htmlView('emails/welcome', {
          name: user.name,
          email: user.email,
        })
    })
  }
}
