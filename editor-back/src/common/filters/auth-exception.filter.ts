import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";

import { responseMessage } from "@/common/interceptors/reponse";

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(UnauthorizedException)
export class UnauthorizedExceptionsFilter implements ExceptionFilter {
	catch(exception: UnauthorizedException, host: ArgumentsHost) {
		// 获取上下文
		const ctx = host.switchToHttp();
		// 获取响应体
		const response = ctx.getResponse<Response>();
		// 获取状态码
		const statusCode = exception.getStatus();

		// 自定义异常返回体
		response
			.status(statusCode)
			.json(responseMessage(null, exception.message, statusCode));
	}
}
