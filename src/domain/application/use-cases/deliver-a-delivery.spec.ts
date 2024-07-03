import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliveryRepository } from 'test/repositories/in-memory-delivery-repository'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { makeDelivery } from 'test/factories/make-delivery'
import { DelivererADeliveryUseCase } from './deliver-a-delivery'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryWithoutAttachmentError } from './errors/delivery-without-attachment-error'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: DelivererADeliveryUseCase

describe('Deliver a delivery', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new DelivererADeliveryUseCase(inMemoryDeliveryRepository)
  })

  it(`should be able to deliver a delivery`, async () => {
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
      attachmentsId: ['1'],
    })

    const deliveryInRepository = inMemoryDeliveryRepository.items[0]

    expect(result.isRight()).toBe(true)
    expect(deliveryInRepository.status.toString()).toEqual('Delivered')
    expect(
      inMemoryDeliveryRepository.items[0].attachment.currentItems,
    ).toHaveLength(1)
    expect(inMemoryDeliveryRepository.items[0].attachment.currentItems).toEqual(
      [expect.objectContaining({ attachmentId: new UniqueEntityID('1') })],
    )
  })

  it(`should not be able to deliver a delivery without one attachment`, async () => {
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
      attachmentsId: [],
    })

    const deliveryInRepository = inMemoryDeliveryRepository.items[0]

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(DeliveryWithoutAttachmentError)
    expect(deliveryInRepository.status.toString()).toEqual('Awaiting')
  })

  it(`should be able to update deliveryDate when deliver a delivery`, async () => {
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
      attachmentsId: ['1'],
    })

    const deliveryInRepository = inMemoryDeliveryRepository.items[0]

    expect(result.isRight()).toBe(true)
    expect(deliveryInRepository.status.toString()).toEqual('Delivered')
    expect(deliveryInRepository.deliveryDate).toEqual(expect.any(Date))
  })
})
