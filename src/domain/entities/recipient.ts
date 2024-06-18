import { randomUUID } from "node:crypto"

export class Recipient {
  public id: string
  public name: string 
  public Latitude: number
  public Longitude: number

  constructor(latitude: number, longitude: number, name: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
    this.Latitude = latitude
    this.Longitude = longitude
  }
}