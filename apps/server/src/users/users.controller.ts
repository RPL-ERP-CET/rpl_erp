import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/common/guards/auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.service.getUsers();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.service.getUser(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateUserDto>,
  ) {
    return this.service.updateUser(id, dto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.service.deleteUser(id);
  }
}
