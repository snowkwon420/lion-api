import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';

// ... (declare const module: any;)

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 8000;

	// ✅ 허용할 출처 목록
	// const allowedOrigins = [
	// 	'http://localhost:3005', // 개발 환경
	// 	'https://nigonego.vercel.app', // Vercel 배포 주소
	// ];

	app.enableCors({
		// origin을 배열로 전달하여 여러 출처를 허용합니다.
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	// --- 이전 답변의 코드 순서 수정 내용은 그대로 적용 ---
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.use(express.static(path.join(__dirname, '..', 'uploads')));

	await app.listen(port);
	// ... (console.log 등 나머지 코드)
}
bootstrap();
