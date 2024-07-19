import { DeliveryAttachmentRepository } from '@/domain/delivery/application/repositories/delivery-attachment-repository'
import { DeliveryAttachment } from '@/domain/delivery/enterprise/entities/delivery-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaDeliveryAttachmentsRepository
  implements DeliveryAttachmentRepository
{
  createMany(attachments: DeliveryAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteMany(attachments: DeliveryAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyByDeliveryId(deliveryId: string): Promise<DeliveryAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByDeliveryId(deliveryId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
