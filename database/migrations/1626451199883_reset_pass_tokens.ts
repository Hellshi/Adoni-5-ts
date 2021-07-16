import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ResetPassTokens extends BaseSchema {
  protected tableName = 'reset_pass_tokens'

  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('token')
      table.timestamp('token_created_at')
    })
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('token')
      table.dropColumn('token_created_at')
    })
  }
}
