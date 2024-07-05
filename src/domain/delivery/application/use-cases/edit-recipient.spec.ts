import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { EditRecipientsUseCase } from './edit-recipient'
import { makeRecipient } from 'test/factories/make-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: EditRecipientsUseCase

describe('Edit Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new EditRecipientsUseCase(inMemoryRecipientRepository)
  })

  it('should be able to edit a recipient', async () => {
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
      name: 'Mark Donahan',
      latitude: -23.5550545,
      longitude: -46.633708,
    })

    expect(inMemoryRecipientRepository.items[0]).toMatchObject({
      name: 'Mark Donahan',
      latitude: -23.5550545,
      longitude: -46.633708,
    })
  })
})
