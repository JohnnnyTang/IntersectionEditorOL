import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/modules/prisma/prisma.service";
import { responseMessage } from "@/common/interceptors/reponse";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	/**
	 * @description: 查询组织列表
	 */
	async findAll() {
		const result = await this.prisma.users.findMany();
		return result;
	}

	async findByEmail(email: string) {
		const result = await this.prisma.users.findUnique({
			where: {
				email,
			},
		});
		return result;
	}

	async createUser(userInfo: User.Create.UserBasicInfo) {
		const existUser = await this.findByEmail(userInfo.email);
		if (existUser != null || existUser != undefined) {
			return null;
		}
		// console.log(userInfo);
		if (userInfo.role === null || userInfo.role === undefined) {
			userInfo.role = "user";
		}
		const insertRes = await this.prisma.users.create({
			data: {
				name: userInfo.name,
				email: userInfo.email,
				password: userInfo.password,
				role: userInfo.role,
			},
		});
		return {
			id: insertRes.uid,
			name: insertRes.name,
			role: insertRes.role,
			tasks: insertRes.tasks,
		};
	}
}
