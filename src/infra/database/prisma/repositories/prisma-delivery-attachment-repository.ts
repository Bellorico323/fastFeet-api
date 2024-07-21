import { DeliveryAttachmentRepository } from '@/domain/delivery/application/repositories/delivery-attachment-repository'
import { DeliveryAttachment } from '@/domain/delivery/enterprise/entities/delivery-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryAttachmentMapper } from '../mappers/prisma-delivery-attachment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDeliveryAttachmentsRepository
  implements DeliveryAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachments: DeliveryAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaDeliveryAttachmentMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: DeliveryAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const attachmentsIds = attachments.map((attachment) =>
      attachment.attachmentId.toString(),
    )

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    })
  }

  async findManyByDeliveryId(
    deliveryId: string,
  ): Promise<DeliveryAttachment[]> {
    const deliveryAttachments = await this.prisma.attachment.findMany({
      where: {
        deliveryId,
      },
    })

    return deliveryAttachments.map(PrismaDeliveryAttachmentMapper.toDomain)
  }

  async deleteManyByDeliveryId(deliveryId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        deliveryId,
      },
    })
  }
}
