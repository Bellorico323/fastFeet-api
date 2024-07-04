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

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
    expect(result.value?.deliveries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            deliverymanId: expect.objectContaining({
              value: deliveryman1.id.toString(),
            }),
          }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            deliverymanId: expect.objectContaining({
              value: deliveryman1.id.toString(),
            }),
          }),
        }),
      ]),
    )
  })

  it('should be able to paginate recipients', async () => {
    const deliveryman = makeDeliveryman()
    await inMemoryDeliverymanRepository.register(deliveryman)

    for (let i = 1; i <= 22; i++) {
      await inMemoryDeliveryRepository.create(
        makeDelivery({ deliverymanId: deliveryman.id }),
      )
    }

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })
})
