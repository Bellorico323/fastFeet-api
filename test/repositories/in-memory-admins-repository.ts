import { AdminRepository } from '@/domain/application/repositories/admin-repository'
import { Admin } from '@/domain/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminRepository {
  public items: Admin[] = []

  async findByEmail(email: string): Promise<Admin | null> {
    const recipient = this.items.find((recipient) => recipient.email === email)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async register(admin: Admin): Promise<void> {
    this.items.push(admin)
  }
}
