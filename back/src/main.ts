import 'dotenv/config'; // بالای فایل main.ts


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:3000', // فقط فرانت‌اند خودت
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true, // اگر میخوای کوکی یا header auth ارسال شود
});
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
