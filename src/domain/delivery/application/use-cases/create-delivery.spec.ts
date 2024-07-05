import { InMemoryDeliveryRepository } from 'test/repositories/in-memory-delivery-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { CreateDeliveryUseCase } from './create-delivery'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliveryAttachmentsRepository } from 'test/repositories/in-memory-delivery-attachments-repository'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let inMemoryDeliveryAttachmentsRepository: InMemoryDeliveryAttachmentsRepository
let sut: CreateDeliveryUseCase

describe('Create delivery', () => {
  beforeEach(() => {
    inMemoryDeliveryAttachmentsRepository =
      new InMemoryDeliveryAttachmentsRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryDeliveryAttachmentsRepository,
      inMemoryRecipientRepository,
    )
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it('should be able to create a new delivery', async () => {
    const deliveryman = makeDeliveryman()
    await inMemoryDeliverymanRepository.register(deliveryman)

    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      recipientId: recipient.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      delivery: inMemoryDeliveryRepository.items[0],
    })
  })

  it('should be able to create a new delivery with awaiting status', async () => {
    const deliveryman = makeDeliveryman()
    await inMemoryDeliverymanRepository.register(deliveryman)

    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      recipientId: recipient.id.toString(),
    })

    const deliveryInRepositoryStatus =
      inMemoryDeliveryRepository.items[0].status

    expect(result.isRight()).toBe(true)
    expect(deliveryInRepositoryStatus.toString()).toEqual('Awaiting')
  })
})
