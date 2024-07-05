import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliveryRepository } from 'test/repositories/in-memory-delivery-repository'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { makeDelivery } from 'test/factories/make-delivery'
import { InMemoryDeliveryAttachmentsRepository } from 'test/repositories/in-memory-delivery-attachments-repository'
import { FetchDeliveriesNearbyUseCase } from './fetch-deliveries-nearby'

let inMemoryDeliveryAttachmentsRepository: InMemoryDeliveryAttachmentsRepository
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: FetchDeliveriesNearbyUseCase

describe('Fetch deliveries nearby', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryDeliveryAttachmentsRepository =
      new InMemoryDeliveryAttachmentsRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryDeliveryAttachmentsRepository,
      inMemoryRecipientRepository,
    )
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new FetchDeliveriesNearbyUseCase(inMemoryDeliveryRepository)
  })

  it(`should be able to fetch deliveries nearby a deliveryman`, async () => {
    const deliveryman = makeDeliveryman({
      latitude: -23.624865,
      longitude: -46.579345,
    })
    await inMemoryDeliverymanRepository.register(deliveryman)

    for (let i = 1; i <= 3; i++) {
      const recipientSpam = makeRecipient({
        latitude: -22.930944,
        longitude: -47.065854,
      })
      await inMemoryRecipientRepository.create(recipientSpam)

      const delivery = makeDelivery({
        recipientId: recipientSpam.id,
        deliverymanId: deliveryman.id,
      })
      await inMemoryDeliveryRepository.create(delivery)
    }

    const recipient = makeRecipient({
      latitude: -23.626856,
      longitude: -46.575281,
    })
    await inMemoryRecipientRepository.create(recipient)

    const delivery1 = makeDelivery({
      recipientId: recipient.id,
      deliverymanId: deliveryman.id,
    })
    await inMemoryDeliveryRepository.create(delivery1)

    const delivery2 = makeDelivery({
      recipientId: recipient.id,
      deliverymanId: deliveryman.id,
    })
    await inMemoryDeliveryRepository.create(delivery2)

    const result = await sut.execute({
      latitude: deliveryman.latitude,
      longitude: deliveryman.longitude,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })

  it(`should not be able to pick up a delivery that is not nearby`, async () => {
    const deliveryman = makeDeliveryman({
      latitude: -23.624865,
      longitude: -46.579345,
    })
    await inMemoryDeliverymanRepository.register(deliveryman)

    const recipient = makeRecipient({
      latitude: -22.930944,
      longitude: -47.065854,
    })
    await inMemoryRecipientRepository.create(recipient)

    const delivery = makeDelivery({
      recipientId: recipient.id,
      deliverymanId: deliveryman.id,
    })
    await inMemoryDeliveryRepository.create(delivery)

    const result = await sut.execute({
      latitude: deliveryman.latitude,
      longitude: deliveryman.longitude,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(0)
  })
})
