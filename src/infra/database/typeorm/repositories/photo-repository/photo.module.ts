import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database.module'
import { PhotoService } from './photo.service'
import { photoProviders } from './photo.providers'

@Module({
  imports: [DatabaseModule],
  providers: [...photoProviders, PhotoService],
  controllers: [],
})
export class PhotoModule {}
