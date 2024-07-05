import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminRepository {
  public items: Admin[] = []

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = this.items.find((admin) => admin.email === email)

    if (!admin) {
      return null
    }

    return admin
  }

  async register(admin: Admin): Promise<void> {
    this.items.push(admin)
  }
}
