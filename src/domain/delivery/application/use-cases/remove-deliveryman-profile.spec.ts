import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { RemoveDeliverymanProfileUseCase } from './remove-deliveryman-profile'

let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let sut: RemoveDeliverymanProfileUseCase

describe('Remove a Deliveryman Profile', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new RemoveDeliverymanProfileUseCase(inMemoryDeliverymanRepository)
  })

  it('should be able to delete a deliveryman', async () => {
    await inMemoryDeliverymanRepository.register(
      makeDeliveryman(
        {
          name: 'John Doe',
          cpf: '111.111.111-11',
          latitude: -23.7719626,
          longitude: -46.5803755,
        },
        new UniqueEntityID('deliveryman-1'),
      ),
    )

    await sut.execute({
      cpf: '111.111.111-11',
    })

    expect(inMemoryDeliverymanRepository.items).toHaveLength(0)
  })
})
