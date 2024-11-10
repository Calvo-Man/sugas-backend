import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './src/app.module';

let server: any;

async function bootstrapServer() {
  const expressApp: Express = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  return serverlessExpress({ app: expressApp });
}

export const handler = async (event: any, context: any) => {
  server = server ?? (await bootstrapServer());
  return server(event, context);
};
