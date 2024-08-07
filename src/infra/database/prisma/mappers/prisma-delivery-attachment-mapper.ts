import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryAttachment } from '@/domain/delivery/enterprise/entities/delivery-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaDeliveryAttachmentMapper {
  static toDomain(raw: PrismaAttachment): DeliveryAttachment {
    if (!raw.deliveryId) {
      throw new Error('Invalid attachment type')
    }

    return DeliveryAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        deliveryId: new UniqueEntityID(raw.deliveryId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: DeliveryAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsIds = attachments.map((attachment) =>
      attachment.attachmentId.toString(),
    )

    return {
      where: {
        id: {
          in: attachmentsIds,
        },
      },
      data: {
        deliveryId: attachments[0].deliveryId.toString(),
      },
    }
  }
}
