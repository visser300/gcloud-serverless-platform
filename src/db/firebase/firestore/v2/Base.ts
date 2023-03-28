import { IsNotEmpty, IsDate } from 'class-validator'
import { IEntity } from 'fireorm'

export class BaseEntity implements IEntity {
  id!: string

  @IsNotEmpty()
  @IsDate()
  createAt!: Date

  @IsNotEmpty()
  @IsDate()
  updateAt!: Date
}

export class BaseEntityFactory {
  protected static _baseCreateEntity = (mintEntity: BaseEntity) => {
    const now = new Date()
    mintEntity.createAt = now
    mintEntity.updateAt = now
  }

  protected static _baseUpdateEntity = (mintEntity: BaseEntity) => {
    const now = new Date()
    mintEntity.updateAt = now
  }
}
