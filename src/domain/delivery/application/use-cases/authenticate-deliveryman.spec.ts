import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { AuthenticateDeliverymanUseCase } from './authenticate-deliveryman'
import { makeDeliveryman } from 'test/factories/make-deliveryman'

let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateDeliverymanUseCase

describe('Authenticate Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a deliveryman', async () => {
    const deliveryman = makeDeliveryman({
      cpf: '111.111.111-11',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      cpf: '111.111.111-11',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ accessToken: expect.any(String) })
  })
})
