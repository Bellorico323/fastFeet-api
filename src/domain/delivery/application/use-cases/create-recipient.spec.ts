import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { CreateRecipientUseCase } from './create-recipient'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: CreateRecipientUseCase

describe('Create recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to create a new recipient', async () => {
    const recipient = makeRecipient({ name: 'John Doe' })

    const result = await sut.execute(recipient)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: inMemoryRecipientRepository.items[0],
    })
  })
})
