import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliveryRepository } from 'test/repositories/in-memory-delivery-repository'
import { PickUpOrderUseCase } from './pick-up-order'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { makeDelivery } from 'test/factories/make-delivery'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: PickUpOrderUseCase

describe('Pick up order', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new PickUpOrderUseCase(inMemoryDeliveryRepository)
  })

  it(`should be able to pick up a delivery`, async () => {
    const deliveryman = makeDeliveryman()
    await inMemoryDeliverymanRepository.register(deliveryman)

    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)

    const delivery = makeDelivery({
      recipientId: recipient.id,
      deliverymanId: deliveryman.id,
    })
    await inMemoryDeliveryRepository.create(delivery)

    expect(inMemoryDeliveryRepository.items[0].status.toString()).toEqual(
      'Awaiting',
    )

    const deliveryId = delivery.id.toString()

    const result = await sut.execute({
      deliveryId,
    })

    const deliveryInRepository = inMemoryDeliveryRepository.items[0]

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      delivery: expect.objectContaining({
        dateOfWithdraw: expect.any(Date),
      }),
    })
    expect(deliveryInRepository.status.toString()).toEqual('Withdrawn')
  })
})
