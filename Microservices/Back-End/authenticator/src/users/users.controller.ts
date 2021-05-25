import { Controller, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger('UsersController');

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /*
  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll(@Payload() reqHeaders: any) {
    return this.usersService.findAll(reqHeaders);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    logger.log(`Asked for #${id}`);
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }

  @MessagePattern('loginUser')
  login(@Payload() userInfo: any) {
    return this.usersService.login(userInfo);
  }

 */

  @MessagePattern('authenticateMe')
  authenticate(@Payload() info: any) {
    try {
      return { result: true, ...this.jwtService.verify(info) };
    } catch (e) {
      return { result: false, ...e};
    }
  }
}
