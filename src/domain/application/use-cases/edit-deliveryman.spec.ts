import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { EditDeliverymanUseCase } from './edit-deliveryman'

let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository
let sut: EditDeliverymanUseCase

describe('Edit Deliveryman Profile', () => {
  beforeEach(() => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository()
    sut = new EditDeliverymanUseCase(inMemoryDeliverymansRepository)
  })

  it(`should be able to change deliveryman's profile`, async () => {
    const deliveryman = makeDeliveryman({
      name: 'John Doe',
      cpf: '111.111.111-11',
    })

    inMemoryDeliverymansRepository.items.push(deliveryman)

    const result = await sut.execute({
      name: 'Alex Kid',
      cpf: '111.111.111-11',
      latitude: 11111,
      longitude: 11111,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverymansRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Alex Kid',
        latitude: 11111,
        longitude: 11111,
      }),
    )
  })

  it(`should not be able to change deliveryman's profile with invalid cpf`, async () => {
    const deliveryman = makeDeliveryman({
      name: 'John Doe',
      cpf: '111.111.111-11',
    })

    inMemoryDeliverymansRepository.items.push(deliveryman)

    const result = await sut.execute({
      name: 'Alex Kid',
      cpf: '111.111.111-21',
      latitude: 11111,
      longitude: 11111,
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryDeliverymansRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        latitude: deliveryman.latitude,
        longitude: deliveryman.longitude,
      }),
    )
  })
})
