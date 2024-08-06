import { RecipientRepository } from '../repositories/recipient-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'

interface GetRecipientByIdUseCaseRequest {
  id: string
}

type GetRecipientByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { recipient: Recipient }
>

@Injectable()
export class GetRecipientByIdUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    id,
  }: GetRecipientByIdUseCaseRequest): Promise<GetRecipientByIdUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(id)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    return right({
      recipient,
    })
  }
}
