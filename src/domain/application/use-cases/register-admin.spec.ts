import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { RegisterAdminUseCase } from './register-admin'

let inMemoryAdminRepository: InMemoryAdminsRepository
let fakeHasher: FakeHasher
let sut: RegisterAdminUseCase

describe('Register Admin', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterAdminUseCase(inMemoryAdminRepository, fakeHasher)
  })

  it('should be able to register a new admin', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      admin: inMemoryAdminRepository.items[0],
    })
  })

  it('should be able to hash admin password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryAdminRepository.items[0].password).toEqual(hashedPassword)
  })
})
