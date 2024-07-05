import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '../../enterprise/entities/delivery'

interface ReturnDeliveryUseCaseRequest {
  deliveryId: string
}

type ReturnDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class ReturnDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
  }: ReturnDeliveryUseCaseRequest): Promise<ReturnDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.status.toReturned()

    this.deliveryRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
