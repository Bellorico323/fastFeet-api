import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipients-repository'
import { GetRecipientByIdUseCase } from './get-recipient-by-id'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: GetRecipientByIdUseCase

describe('Get Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new GetRecipientByIdUseCase(inMemoryRecipientRepository)
  })

  it('should be able to get recipient by id', async () => {
    const recipient = makeRecipient({
      name: 'John Doe',
      latitude: -23.5649577,
      longitude: -46.6574655,
    })
    await inMemoryRecipientRepository.create(recipient)

    const recipientId = recipient.id.toString()

    const result = await sut.execute({ id: recipientId })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        name: recipient.name,
        longitude: recipient.longitude,
        latitude: recipient.latitude,
      }),
    })
  })
})
