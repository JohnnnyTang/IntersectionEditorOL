import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { responseMessage } from "@/common/interceptors/reponse";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	signIn(@Body() signInDto: User.Auth.UserLoginInfo) {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@UseGuards(AuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return responseMessage(req.user);
	}

	@Post("refresh")
	refresh(@Body("refresh_token") refresh_token: string) {
		return this.authService.refreshToken(refresh_token);
	}
}
