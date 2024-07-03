import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'

interface RemoveDeliverymanProfileUseCaseRequest {
  cpf: string
}

type RemoveDeliverymanProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class RemoveDeliverymanProfileUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    cpf,
  }: RemoveDeliverymanProfileUseCaseRequest): Promise<RemoveDeliverymanProfileUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    await this.deliverymanRepository.remove(deliveryman)

    return right(null)
  }
}
