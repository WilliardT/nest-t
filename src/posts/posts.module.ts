import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HttpModule } from "@nestjs/axios";



@Module({
  imports: [HttpModule.register({})],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
