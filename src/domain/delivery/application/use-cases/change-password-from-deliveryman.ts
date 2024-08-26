import { Either, left, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { Injectable } from '@nestjs/common'

interface ChangePasswordFromDeliverymanUseCaseRequest {
  cpf: string
  newPassword: string
}

type ChangePasswordFromDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

@Injectable()
export class ChangePasswordFromDeliverymanDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    cpf,
    newPassword,
  }: ChangePasswordFromDeliverymanUseCaseRequest): Promise<ChangePasswordFromDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    deliveryman.password = await this.hashGenerator.hash(newPassword)

    this.deliverymanRepository.save(deliveryman)

    return right({
      deliveryman,
    })
  }
}
