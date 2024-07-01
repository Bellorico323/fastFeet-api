import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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
      dateOfWithdraw: null,
      deliveryDate: null,
    })

    await this.deliveryRepository.create(delivery)

    return right({
      delivery,
    })
  }
}
