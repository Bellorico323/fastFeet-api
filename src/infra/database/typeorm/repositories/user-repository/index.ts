import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from '../../entity/user'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  async create({ name, email, password }: Omit<User, 'id'>): Promise<void> {
    const user = this.userRepository.create({
      name,
      email,
      password,
    })
    await this.userRepository.save(user)
  }
}
