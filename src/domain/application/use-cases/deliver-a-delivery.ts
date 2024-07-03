import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryAttachment } from '@/domain/enterprise/entities/delivery-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryAttachmentList } from '@/domain/enterprise/entities/delivery-attachment-list'
import { DeliveryWithoutAttachmentError } from './errors/delivery-without-attachment-error'

interface DelivererADeliveryUseCaseRequest {
  deliveryId: string
  attachmentsId: string[]
}

type DelivererADeliveryUseCaseResponse = Either<
  ResourceNotFoundError | DeliveryWithoutAttachmentError,
  {
    delivery: Delivery
  }
>

export class DelivererADeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    attachmentsId,
  }: DelivererADeliveryUseCaseRequest): Promise<DelivererADeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    const deliveryAttachment = attachmentsId.map((attachmentId) => {
      return DeliveryAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        deliveryId: delivery.id,
      })
    })

    delivery.attachment = new DeliveryAttachmentList(deliveryAttachment)

    if (delivery.attachment.currentItems.length < 1) {
      return left(new DeliveryWithoutAttachmentError(delivery.id.toString()))
    }

    delivery.status.toDelivered()

    this.deliveryRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
