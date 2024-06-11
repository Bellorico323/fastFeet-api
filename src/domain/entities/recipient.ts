import { randomUUID } from "node:crypto"

export class Recipient {
  id: string
  cpf: string

  constructor(cpf: string, id?: string) {
    this.id = id ?? randomUUID()
    this.cpf = cpf
  }
}