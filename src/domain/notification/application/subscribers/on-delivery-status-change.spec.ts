import { makeDelivery } from 'test/factories/make-delivery'
import { OnDeliveryCreated } from './on-delivery-created'
import { InMemoryDeliveryRepository } from 'test/repositories/in-memory-delivery-repository'
import { InMemoryDeliveryAttachmentsRepository } from 'test/repositories/in-memory-delivery-attachments-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { DeliveryStatus } from '@/domain/delivery/enterprise/entities/value-objects/delivery-status'

let inMemoryDeliveryAttachmentsRepository: InMemoryDeliveryAttachmentsRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryDeliveriesRepository: InMemoryDeliveryRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Delivery Status Change', async () => {
  beforeEach(() => {
    inMemoryDeliveryAttachmentsRepository =
      new InMemoryDeliveryAttachmentsRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryDeliveriesRepository = new InMemoryDeliveryRepository(
      inMemoryDeliveryAttachmentsRepository,
      inMemoryRecipientRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnDeliveryCreated(inMemoryRecipientRepository, sendNotificationUseCase)
  })

  it('should send a notification when a delivery status change', async () => {
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)

    const delivery = makeDelivery({ recipientId: recipient.id })
    await inMemoryDeliveriesRepository.create(delivery)

    delivery.status = DeliveryStatus.toDelivered()
    await inMemoryDeliveriesRepository.save(delivery)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
