import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { FetchRecipientsUseCase } from './fetch-recipients'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: FetchRecipientsUseCase

describe('Fetch recipients', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new FetchRecipientsUseCase(inMemoryRecipientRepository)
  })

  it('should be able to fetch recipients', async () => {
    inMemoryRecipientRepository.create(makeRecipient({ name: 'John Doe' }))
    inMemoryRecipientRepository.create(makeRecipient({ name: 'John Doe1' }))
    inMemoryRecipientRepository.create(makeRecipient({ name: 'John Doe2' }))

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipients: expect.arrayContaining([
        expect.objectContaining({ name: 'John Doe' }),
        expect.objectContaining({ name: 'John Doe1' }),
        expect.objectContaining({ name: 'John Doe2' }),
      ]),
    })
  })

  it('should be able to paginate recipients', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryRecipientRepository.create(makeRecipient())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.recipients).toHaveLength(2)
  })
})
