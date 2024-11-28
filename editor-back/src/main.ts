import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "@/common/filters/all-exception.filter"; // 全局异常过滤器
import { HttpExceptionsFilter } from "@/common/filters/http-exception.filter"; // http 异常过滤器
import { UnauthorizedExceptionsFilter } from "@/common/filters/auth-exception.filter";
import { ValidationPipe } from "@/pipe/global.validation.pipe"; // 全局管道
import * as session from "express-session";
import { createProxyMiddleware } from "http-proxy-middleware";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// 错误异常捕获 和 过滤处理
	app.useGlobalFilters(new AllExceptionsFilter());
	app.useGlobalFilters(new HttpExceptionsFilter());
	app.useGlobalFilters(new UnauthorizedExceptionsFilter());

	app.useGlobalPipes(new ValidationPipe());

	app.use(
		session({
			secret: "gnatizoah",
			resave: false,
			saveUninitialized: true,
		}),
	);

	app.use(
		"/proxy",
		createProxyMiddleware({
			target: "http://127.0.0.1:3001/v1",
			changeOrigin: true,
			secure: false,
			on: {
				proxyReq: (proxyReq, req, res) => {
					console.log(proxyReq.path);
					console.log(
						`[NestMiddleware]: Proxying ${req.method} request originally made from '${req.url}' to ${proxyReq.path}...`,
					);
				},
			},
		}),
	);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
