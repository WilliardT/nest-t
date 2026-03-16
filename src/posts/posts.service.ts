import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { IPostsResponse } from "./interfaces/posts.interface";


@Injectable()
export class PostsService {
  private URL = 'https://dummyjson.com'

  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async getPosts(): Promise<IPostsResponse> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL}/posts`)
    )

    return response.data
  }

}
