import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { AuthenticateAdminUseCase } from './authenticate-admin'
import { makeAdmin } from 'test/factories/make-admin'

let inMemoryAdminRepository: InMemoryAdminsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateAdminUseCase

describe('Authenticate Admin', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateAdminUseCase(
      inMemoryAdminRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a admin', async () => {
    const admin = makeAdmin({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryAdminRepository.items.push(admin)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ accessToken: expect.any(String) })
  })
})
