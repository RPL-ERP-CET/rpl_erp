import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  @Get(":id")
  getUser(@Param("id") id: string) {
    return this.service.getUser(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() dto: Partial<CreateUserDto>) {
    return this.service.updateUser(id, dto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.service.deleteUser(id);
  }
}
