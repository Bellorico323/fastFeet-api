import { UseCaseError } from '@/core/errors/use-case-error'

export class AdminAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`admin "${identifier}" address already exists`)
  }
}
