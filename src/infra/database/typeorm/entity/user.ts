import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 500 })
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string
}
