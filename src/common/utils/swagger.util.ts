import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from "../../config/swagger.config";


export function setupSwagger(app: INestApplication): void {
  const config = getSwaggerConfig()

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
