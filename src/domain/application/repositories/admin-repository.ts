import { Admin } from '@/domain/enterprise/entities/admin'

export interface AdminRepository {
  findByEmail(email: string): Promise<Admin | null>
  register(admin: Admin): Promise<void>
}
