import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  latitude: number

  @Column()
  longitude: number
}
