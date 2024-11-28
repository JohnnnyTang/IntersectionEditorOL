import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as dayjs from "dayjs";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log(
			`${req.method} Request for ${req.baseUrl + req.url} at ${dayjs().toDate()}`,
		);
		next();
	}
}
