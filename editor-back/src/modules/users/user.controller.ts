import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "@/dto/user.create.dto";
import { responseMessage } from "@/common/interceptors/reponse";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	/**
  @description: 查询组织列表
  */
	@Get()
	findAll() {
		return responseMessage(this.userService.findAll());
	}

	@Post()
	create(@Body() createUserDTO: CreateUserDTO) {
		const result = this.userService.createUser(createUserDTO);
		if (!result) {
			return responseMessage(null, "用户已存在", 400);
		}
		return responseMessage(result, "注册成功");
	}

	@Get("email/:email")
	findByEmail(@Param("email") email: string) {
		return responseMessage(this.userService.findByEmail(email));
	}
}
