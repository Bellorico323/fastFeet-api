import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { DeliveryStatusChangeEvent } from '@/domain/delivery/enterprise/events/delivery-status-change'

export class OnDeliveryCreated implements EventHandler {
  constructor(
    private recipientsRepository: RecipientRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewDeliveryStatusChangeNotificaction.bind(this),
      DeliveryStatusChangeEvent.name,
    )
  }

  private async sendNewDeliveryStatusChangeNotificaction({
    delivery,
    status,
  }: DeliveryStatusChangeEvent) {
    const recipient = await this.recipientsRepository.findById(
      delivery.recipientId.toString(),
    )
    if (recipient) {
      await this.sendNotification.execute({
        recipientId: recipient?.id.toString(),
        title: `Your delivery is ${status.toString()}`,
        content: `${recipient.name},your delivery is has been ${status.toString()}`,
      })
    }
  }
}
