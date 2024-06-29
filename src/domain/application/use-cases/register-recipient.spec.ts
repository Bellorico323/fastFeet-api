import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { RegisterRecipientUseCase } from './register-recipient'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: RegisterRecipientUseCase

describe('Register recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new RegisterRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to register a new recipient', async () => {
    const recipient = makeRecipient({ name: 'John Doe' })

    const result = await sut.execute(recipient)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: inMemoryRecipientRepository.items[0],
    })
  })
})
