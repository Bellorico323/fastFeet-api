import { DataSource } from 'typeorm'
import { User } from './entity/user'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: 'postgres',
        password: 'docker',
        database: 'fastfeet',
        entities: [User],
        migrations: ['src/infra/typeorm/migration/**/*.ts'],
        synchronize: true,
      })

      return dataSource.initialize()
    },
  },
]
