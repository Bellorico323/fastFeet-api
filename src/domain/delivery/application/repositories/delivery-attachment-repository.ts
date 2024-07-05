import { DeliveryAttachment } from '../../enterprise/entities/delivery-attachment'

export abstract class DeliveryAttachmentRepository {
  abstract createMany(attachments: DeliveryAttachment[]): Promise<void>
  abstract deleteMany(attachments: DeliveryAttachment[]): Promise<void>

  abstract findManyByDeliveryId(
    deliveryId: string,
  ): Promise<DeliveryAttachment[]>

  abstract deleteManyByDeliveryId(deliveryId: string): Promise<void>
}
