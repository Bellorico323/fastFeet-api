import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Deliveryman {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  cpf: string

  @Column()
  password: string

  @Column()
  latitude: number

  @Column()
  longitude: number
}
