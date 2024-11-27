import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super();
	}
	async onModuleInit() {
		await this.$connect(); // 在模块初始化时连接到数据库
	}

	async onModuleDestroy() {
		await this.$disconnect(); // 在应用程序关闭时断开与数据库的连
	}
}
