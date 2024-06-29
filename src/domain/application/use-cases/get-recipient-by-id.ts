import { Recipient } from '@/domain/enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetRecipientByIdUseCaseRequest {
  id: string
}

type GetRecipientByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { recipient: Recipient }
>

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
