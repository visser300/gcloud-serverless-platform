import { IsNotEmpty } from 'class-validator'
import { Collection, runTransaction } from 'fireorm'
import { TransactionRepository } from 'fireorm/lib/src/Transaction/BaseFirestoreTransactionRepository'
import { BaseEntity, BaseEntityFactory } from './Base'

export const MASTER_DOC = 'm1'

@Collection('master_data')
export class MasterData extends BaseEntity {
  @IsNotEmpty()
  id!: string
}

export class MasterDataFactory extends BaseEntityFactory {
  private static createEntity = () => {
    const master = new MasterData()
    master.id = 'm1'
    this._baseCreateEntity(master) // base function
    return master
  }

  static getEntity = async (masterDataTxRepository?: TransactionRepository<MasterData>) => {
    if (masterDataTxRepository) return await this.getEntityInternal(masterDataTxRepository)

    return await runTransaction<MasterData>(async (tx) => {
      const masterDataRepository = tx.getRepository(MasterData)
      return await this.getEntityInternal(masterDataRepository)
    })
  }

  private static getEntityInternal = async (masterDataTxRepository: TransactionRepository<MasterData>) => {
    const master = await masterDataTxRepository.findById(MASTER_DOC)
    if (!master) {
      const createdMaster = MasterDataFactory.createEntity()
      return await masterDataTxRepository.create(createdMaster)
    } else {
      return master
    }
  }
}
