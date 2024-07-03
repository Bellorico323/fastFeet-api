import { DeliveryAttachmentRepository } from '@/domain/application/repositories/delivery-attachment-repository'
import { DeliveryAttachment } from '@/domain/enterprise/entities/delivery-attachment'

export class InMemoryDeliveryAttachmentsRepository
  implements DeliveryAttachmentRepository
{
  public items: DeliveryAttachment[] = []

  async findManyByDeliveryId(deliveryId: string) {
    const deliveryAttachments = this.items.filter(
      (item) => item.deliveryId.toString() === deliveryId,
    )

    return deliveryAttachments
  }

  async deleteManyByDeliveryId(deliveryId: string) {
    const deliveryAttachments = this.items.filter(
      (item) => item.deliveryId.toString() !== deliveryId,
    )

    this.items = deliveryAttachments
  }

  async createMany(attachments: DeliveryAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: DeliveryAttachment[]): Promise<void> {
    const deliveryAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.id.equals(item.id))
    })

    this.items = deliveryAttachments
  }
}
