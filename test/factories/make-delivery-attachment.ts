import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryAttachment,
  DeliveryAttachmentProps,
} from '@/domain/enterprise/entities/delivery-attachment'

export function makeDeliveryAttachment(
  override: Partial<DeliveryAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryAttachment = DeliveryAttachment.create(
    {
      deliveryId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return deliveryAttachment
}
