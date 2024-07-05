import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Delivery } from '../../enterprise/entities/delivery'

interface CreateDeliveryUseCaseRequest {
  recipientId: string
  deliverymanId: string
}

type CreateDeliveryUseCaseResponse = Either<null, { delivery: Delivery }>

export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    recipientId,
    deliverymanId,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const delivery = Delivery.create({
      recipientId: new UniqueEntityID(recipientId),
      deliverymanId: new UniqueEntityID(deliverymanId),
    })

    await this.deliveryRepository.create(delivery)

    return right({
      delivery,
    })
  }
}
