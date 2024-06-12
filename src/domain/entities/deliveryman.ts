import { randomUUID } from "node:crypto"

export class Deliveryman {
  public id: string
  public name: string
  public cpf: string
  public latitude: number
  public longitude: number

  constructor(name: string, latitude: number, longitude: number, cpf: string,  id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
    this.cpf = cpf
    this.latitude = latitude
    this.longitude = longitude
  }
}