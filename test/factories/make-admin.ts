import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Admin, AdminProps } from '@/domain/enterprise/entities/admin'

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityID,
) {
  const admin = Admin.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.lorem.word(6),
      ...override,
    },
    id,
  )

  return admin
}
