import { randomUUID } from "node:crypto"

export class Recipient {
  id: string
  public Latitude: number
  public Longitude: number

  constructor(cpf: string, latitude: number, longitude: number, id?: string) {
    this.id = id ?? randomUUID()
    this.Latitude = latitude
    this.Longitude = longitude
  }
}