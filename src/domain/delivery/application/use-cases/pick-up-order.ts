import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { UnauthorizedError } from './errors/unauthorized-error'
import { Delivery } from '../../enterprise/entities/delivery'

interface PickUpOrderUseCaseRequest {
  deliveryId: string
  deliverymanId: string
}

type PickUpOrderUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    delivery: Delivery
  }
>

export class PickUpOrderUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    deliverymanId,
  }: PickUpOrderUseCaseRequest): Promise<PickUpOrderUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    if (delivery.deliverymanId.toString() !== deliverymanId) {
      return left(new UnauthorizedError())
    }

    delivery.status.toWithdrawn()
    delivery.dateOfWithdraw = new Date()

    this.deliveryRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
