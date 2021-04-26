import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private manager: Repository<User>,
    private jwtService: JwtService,
  ) {}

  logger = new Logger('user');

  create(createUserDto: CreateUserDto) {
    const user = this.manager.create(createUserDto);
    this.logger.log(
      `Trying to add (${user.username} ${user.email} ${user.password} ${user.name}) at Database`,
    );
    return this.manager.insert(user).then(() => {
      return {
        access_token: this.jwtService.sign({
          username: user.username,
          email: user.email,
          memberSince: user.memberSince,
        }),
      };
    });
    // return this.manager.insert(user).catch((e) => {
    //   return 'An Error Occured. ' + e;
    // });
  }

  async login(userInfo: any) {
    const hash = await this.findOne(userInfo.username);
    if (!hash) throw new NotFoundException('User Not Found');
    const isMatch = await bcrypt.compare(userInfo.password, hash.password);
    this.logger.log(isMatch);
    if (isMatch)
      return {
        access_token: this.jwtService.sign({
          username: userInfo.username,
          email: hash.email,
          memberSince: hash.memberSince,
        }),
      };
    else throw new UnauthorizedException('Wrong Password');
  }

  findOne(username: string): Promise<User> {
    return this.manager.findOne(username);
  }

  find() {
    return this.manager.find();
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
