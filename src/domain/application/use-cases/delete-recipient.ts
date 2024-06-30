import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteRecipientUseCaseRequest {
  id: string
}

type DeleteRecipientUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    id,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(id)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    await this.recipientRepository.delete(recipient)

    return right(null)
  }
}
