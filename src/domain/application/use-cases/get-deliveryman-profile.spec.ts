import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { GetDeliverymanProfileUseCase } from './get-deliveryman-profile'

let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository
let sut: GetDeliverymanProfileUseCase

describe('Get Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository()
    sut = new GetDeliverymanProfileUseCase(inMemoryDeliverymansRepository)
  })

  it('should be able to get deliveryman by cpf', async () => {
    const deliveryman = makeDeliveryman({
      name: 'John Doe',
      cpf: '111.111.111-11',
      latitude: -23.5649577,
      longitude: -46.6574655,
    })
    await inMemoryDeliverymansRepository.register(deliveryman)

    const result = await sut.execute({ cpf: '111.111.111-11' })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      deliveryman: expect.objectContaining({
        name: deliveryman.name,
        cpf: '111.111.111-11',
        longitude: deliveryman.longitude,
        latitude: deliveryman.latitude,
      }),
    })
  })
})
