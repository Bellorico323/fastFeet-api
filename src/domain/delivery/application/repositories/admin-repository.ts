import { Admin } from '../../enterprise/entities/admin'

export abstract class AdminRepository {
  abstract findByEmail(email: string): Promise<Admin | null>
  abstract register(admin: Admin): Promise<void>
}
