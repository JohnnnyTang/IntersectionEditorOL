import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/users/user.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
	imports: [UserModule, PrismaModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("user");
	}
}
