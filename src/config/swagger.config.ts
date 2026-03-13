import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('API documentation:')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // etc. settings include: []
  // deepScanRoutes: true
  // operationIdFactory // схожие методы

  SwaggerModule.setup('/docs', app, document, {
    customSiteTitle: 'API docs',
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
  });
}
