import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliverymans-repository'
import { RegisterDeliverymanUseCase } from './register-deliveryman'

let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let fakeHasher: FakeHasher
let sut: RegisterDeliverymanUseCase

describe('Register Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
    )
  })

  it('should be able to register a new deliveryman', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '111.111.111-45',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      deliveryman: inMemoryDeliverymanRepository.items[0],
    })
  })

  it('should be able to hash deliveryman password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '111.111.111-45',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverymanRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
