import { InMemoryDeliveryAttachmentsRepository } from 'test/repositories/in-memory-delivery-attachments-repository'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { FetchDeliverymanDeliveriesUseCase } from './fetch-deliveryman-deliveries'
import { InMemoryDeliveryRepository } from 'test/repositories/in-memory-delivery-repository'
import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { makeDelivery } from 'test/factories/make-delivery'

let inMemoryDeliveryAttachmentsRepository: InMemoryDeliveryAttachmentsRepository
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let sut: FetchDeliverymanDeliveriesUseCase

describe('Fetch Deliveryman Deliveries', () => {
  beforeEach(() => {
    inMemoryDeliveryAttachmentsRepository =
      new InMemoryDeliveryAttachmentsRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryDeliveryAttachmentsRepository,
    )
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new FetchDeliverymanDeliveriesUseCase(inMemoryDeliveryRepository)
  })

  it('should be able to fetch deliveryman deliveries', async () => {
    const deliveryman1 = makeDeliveryman()
    await inMemoryDeliverymanRepository.register(deliveryman1)

    const deliveryman2 = makeDeliveryman()
    await inMemoryDeliverymanRepository.register(deliveryman2)

    await inMemoryDeliveryRepository.create(
      makeDelivery({ deliverymanId: deliveryman1.id }),
    )

    await inMemoryDeliveryRepository.create(
      makeDelivery({ deliverymanId: deliveryman1.id }),
    )

    await inMemoryDeliveryRepository.create(
      makeDelivery({ deliverymanId: deliveryman2.id }),
    )

    const result = await sut.execute({
      deliverymanId: deliveryman1.id.toString(),
      page: 1,
    })

    console.log(result.value)

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })
})
