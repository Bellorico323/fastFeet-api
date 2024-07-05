import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { DeliveryCreatedEvent } from '@/domain/delivery/enterprise/events/delivery-created-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnDeliveryCreated implements EventHandler {
  constructor(
    private recipientsRepository: RecipientRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewDeliveryNotificaction.bind(this),
      DeliveryCreatedEvent.name,
    )
  }

  private async sendNewDeliveryNotificaction({
    delivery,
  }: DeliveryCreatedEvent) {
    const recipient = await this.recipientsRepository.findById(
      delivery.recipientId.toString(),
    )

    if (recipient) {
      await this.sendNotification.execute({
        recipientId: recipient?.id.toString(),
        title: 'New delivery confirmed',
        content: `${recipient.name},your delivery is ${delivery.status.toString().toLowerCase()} the deliveryman`,
      })
    }
  }
}
