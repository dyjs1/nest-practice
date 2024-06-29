import { Module } from '@nestjs/common';
import { ProdInfoNoticeController } from './prod-info-notice.controller';

@Module({
  controllers: [ProdInfoNoticeController]
})
export class ProdInfoNoticeModule {}
