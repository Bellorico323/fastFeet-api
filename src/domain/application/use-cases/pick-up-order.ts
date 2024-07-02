import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'

interface PickUpOrderUseCaseRequest {
  deliveryId: string
}

type PickUpOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class PickUpOrderUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
  }: PickUpOrderUseCaseRequest): Promise<PickUpOrderUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.status.toWithdrawn()
    delivery.dateOfWithdraw = new Date()

    this.deliveryRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
