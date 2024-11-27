import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "@/dto/user.create.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	/**
  @description: 查询组织列表
  */
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Post()
	create(@Body() createUserDTO: CreateUserDTO) {
		return this.userService.createUser(createUserDTO);
	}

	@Get("email/:email")
	@UseGuards(AuthGuard)
	findByEmail(@Param("email") email: string) {
		return this.userService.findByEmail(email);
	}

	@Get("id/:id")
	@UseGuards(AuthGuard)
	findByUid(@Param("id") id: string) {
		return this.userService.findByUid(id);
	}
}
