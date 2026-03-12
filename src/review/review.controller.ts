import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreatePreviewDto } from "./dto/create-preview.dto";


@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() dto: CreatePreviewDto) {
    return this.reviewService.create(dto);
  }

}
