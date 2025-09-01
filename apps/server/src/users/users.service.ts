import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";

import { User } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async comparePassword(email: string, password: string): Promise<boolean> {
    const fetchedUser = await this.userRepo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .addSelect("user.password")
      .getOne();

    if (!fetchedUser) throw new NotFoundException("User not found");

    const comparePassword = await bcrypt.compare(
      password,
      fetchedUser.password,
    );

    if (!comparePassword) throw new UnauthorizedException();
    return comparePassword;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  async updateUser(id: string, dto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.getUser(id);
    return await this.userRepo.save({
      ...user,
      ...dto,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    await this.userRepo.remove(user);
  }
}
