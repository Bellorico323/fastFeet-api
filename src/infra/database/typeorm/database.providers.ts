import { DataSource } from 'typeorm'
import { User } from './entity/user'
import { Recipient } from './entity/recipient'
import { Deliveryman } from './entity/deliveryman'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  entities: [User, Recipient, Deliveryman],
  migrations: ['src/infra/database/typeorm/migrations/**/*.ts'],
  synchronize: false,
})

// Inicialize a conexão
dataSource.initialize().catch((err) => {
  console.error('Error during Data Source initialization', err)
})

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      if (!dataSource.isInitialized) {
        await dataSource.initialize()
      }
      return dataSource
    },
  },
]
