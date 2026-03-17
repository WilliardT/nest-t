import { ApiProperty } from "@nestjs/swagger";


export class AuthResponse {
  @ApiProperty({
    description: 'JWT access_token',
    example: 'eydfgjdhfgjdhfjghdfg...'
  })
  accessToken: string

}
