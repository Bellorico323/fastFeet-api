import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { Deliveryman } from '../../enterprise/entities/deliveryman'

interface GetDeliverymanProfileUseCaseRequest {
  cpf: string
}

type GetDeliverymanProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  { deliveryman: Deliveryman }
>

export class GetDeliverymanProfileUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    cpf,
  }: GetDeliverymanProfileUseCaseRequest): Promise<GetDeliverymanProfileUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    return right({
      deliveryman,
    })
  }
}
