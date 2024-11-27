import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { responseMessage } from "@/common/interceptors/reponse";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string) {
		const user = await this.prisma.users.findUnique({ where: { email } });
		if (!user) {
			return responseMessage(null, "No account for this email!!!", 13);
		}
		if (user?.password !== pass) {
			return responseMessage(null, "Wrong password!!!", 11);
		}
		const payload = { sub: user.uid, username: user.name };
		const access_token = await this.jwtService.signAsync(payload, {
			expiresIn: "30m",
		});
		const refresh_token = await this.jwtService.signAsync(
			{ sub: user.uid },
			{
				expiresIn: "7d",
			},
		);
		return responseMessage({
			access_token,
			refresh_token,
			userInfo: {
				name: user.name,
				email: user.email,
				role: user.role,
				tasks: user.tasks,
				uid: user.uid,
			},
		});
	}

	async refreshToken(refresh_token: string) {
		try {
			// 验证refresh_token
			const decoded = this.jwtService.verify(refresh_token);

			// 获取用户信息
			const user = await this.prisma.users.findUnique({
				where: {
					uid: decoded.sub,
				},
			});

			const payload = { sub: user.uid, username: user.name };
			const access_token = await this.jwtService.signAsync(payload, {
				expiresIn: "30m",
			});
			const refreshed_token = await this.jwtService.signAsync(
				{ sub: user.uid },
				{
					expiresIn: "7d",
				},
			);
			return responseMessage(
				{
					access_token,
					refreshed_token,
				},
				"token已刷新",
			);
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
