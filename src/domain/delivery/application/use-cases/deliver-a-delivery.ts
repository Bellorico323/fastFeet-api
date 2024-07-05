import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryWithoutAttachmentError } from './errors/delivery-without-attachment-error'
import { UnauthorizedError } from './errors/unauthorized-error'
import { DeliveryAttachmentList } from '../../enterprise/entities/delivery-attachment-list'
import { DeliveryAttachment } from '../../enterprise/entities/delivery-attachment'
import { Delivery } from '../../enterprise/entities/delivery'

interface DelivererADeliveryUseCaseRequest {
  deliveryId: string
  deliverymanId: string
  attachmentsId: string[]
}

type DelivererADeliveryUseCaseResponse = Either<
  ResourceNotFoundError | DeliveryWithoutAttachmentError | UnauthorizedError,
  {
    delivery: Delivery
  }
>

export class DelivererADeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    deliverymanId,
    attachmentsId,
  }: DelivererADeliveryUseCaseRequest): Promise<DelivererADeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    if (delivery.deliverymanId.toString() !== deliverymanId) {
      return left(new UnauthorizedError())
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
    delivery.deliveryDate = new Date()

    this.deliveryRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
