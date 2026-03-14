import { DocumentBuilder } from '@nestjs/swagger';


export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('API documentation:')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}


