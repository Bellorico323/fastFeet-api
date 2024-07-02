import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'

interface DelivererADeliveryUseCaseRequest {
  deliveryId: string
}

type DelivererADeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class DelivererADeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
  }: DelivererADeliveryUseCaseRequest): Promise<DelivererADeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.status.toDelivered()

    this.deliveryRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
