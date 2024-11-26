import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Global() // 添加这个装饰器表明这个模块的提供商应该是全局的
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
