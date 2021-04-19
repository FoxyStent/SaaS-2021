import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private manager: EntityManager,
    private jwtService: JwtService,
  ) {}

  logger = new Logger('user');

  create(createUserDto: CreateUserDto) {
    const user = this.manager.create(User, createUserDto);
    this.logger.log(
      `Trying to add (${user.username} ${user.email} ${user.password} ${user.name}) at Database`,
    );
    try {
      return this.manager.insert(User, user);
    } catch (e) {
      return 'An Error Occurred.' + e;
    }
    // return this.manager.insert(user).catch((e) => {
    //   return 'An Error Occured. ' + e;
    // });
  }

  async login(userInfo: any) {
    const hash = await this.findOne(userInfo.username);
    if (!hash) return 'User not Found';
    const isMatch = bcrypt.compare(userInfo.password, hash.password);
    if (isMatch)
      return {
        access_token: this.jwtService.sign({ username: userInfo.username }),
      };
  }

  findOne(username: string): Promise<User> {
    return this.manager.findOne(username);
  }

  //
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.manager.transaction( async manager => {
  //     const u = await manager.findOne(id);
  //   })
  // }

  remove(id: number) {
    return `This action removes a #${id} uer`;
  }
}
