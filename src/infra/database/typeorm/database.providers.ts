import { DataSource } from 'typeorm'
import { join } from 'path'

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
        entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
        migrations: ['src/infra/typeorm/migration/**/*.ts'],
        synchronize: true,
      })

      return dataSource.initialize()
    },
  },
]
