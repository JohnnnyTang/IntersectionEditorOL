import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "@/common/filters/all-exception.filter"; // 全局异常过滤器
import { HttpExceptionsFilter } from "@/common/filters/http-exception.filter"; // http 异常过滤器
import { ValidationPipe } from "@/pipe/global.validation.pipe"; // 全局管道
import * as session from "express-session";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// 错误异常捕获 和 过滤处理
	app.useGlobalFilters(new AllExceptionsFilter());
	app.useGlobalFilters(new HttpExceptionsFilter());

	app.useGlobalPipes(new ValidationPipe());

	app.use(
		session({
			secret: "gnatizoah",
			resave: false,
			saveUninitialized: true,
		}),
	);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
