import { Injectable } from '@nestjs/common';
import { PostsService } from "./posts/posts.service";
import { IPostsResponse } from "./posts/interfaces/posts.interface";


@Injectable()
export class AppService {
  constructor(
    private readonly postsService: PostsService
  ){}


  async getAllUsersPosts(): Promise<IPostsResponse> {
    const posts = await this.postsService.getPosts()

    return posts
  }
}
