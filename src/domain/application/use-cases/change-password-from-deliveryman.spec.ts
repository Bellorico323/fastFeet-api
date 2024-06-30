import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { ChangePasswordFromDeliverymanDeliverymanUseCase } from './change-password-from-deliveryman'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliveryman } from 'test/factories/make-deliveryman'

let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository
let fakeHasher: FakeHasher
let sut: ChangePasswordFromDeliverymanDeliverymanUseCase

describe('Change Deliveryman Password', () => {
  beforeEach(() => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository()
    fakeHasher = new FakeHasher()
    sut = new ChangePasswordFromDeliverymanDeliverymanUseCase(
      inMemoryDeliverymansRepository,
      fakeHasher,
    )
  })

  it(`should be able to change deliveryman's password`, async () => {
    const oldPassword = 'pass1234'

    const deliveryman = makeDeliveryman({
      cpf: '111.111.111-11',
      password: await fakeHasher.hash(oldPassword),
    })

    inMemoryDeliverymansRepository.items.push(deliveryman)

    const result = await sut.execute({
      cpf: '111.111.111-11',
      newPassword: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverymansRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
