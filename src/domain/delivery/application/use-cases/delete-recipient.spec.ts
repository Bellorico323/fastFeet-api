import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteRecipientUseCase } from './delete-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: DeleteRecipientUseCase

describe('Delete a Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new DeleteRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to delete a recipient', async () => {
    await inMemoryRecipientRepository.create(
      makeRecipient(
        {
          name: 'John Doe',
          latitude: -23.7719626,
          longitude: -46.5803755,
        },
        new UniqueEntityID('recipient-1'),
      ),
    )

    await sut.execute({
      id: 'recipient-1',
    })

    expect(inMemoryRecipientRepository.items).toHaveLength(0)
  })
})
