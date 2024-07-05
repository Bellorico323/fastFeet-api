import { Either, left, right } from '@/core/either'
import { AdminRepository } from '../repositories/admin-repository'
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Admin } from '../../enterprise/entities/admin'

interface RegisterAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterAdminUseCaseResponse = Either<
  AdminAlreadyExistsError,
  {
    admin: Admin
  }
>

export class RegisterAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const adminWithSameEmail = await this.adminRepository.findByEmail(email)

    if (adminWithSameEmail) {
      return left(new AdminAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const admin = Admin.create({ name, email, password: hashedPassword })

    await this.adminRepository.register(admin)

    return right({
      admin,
    })
  }
}
