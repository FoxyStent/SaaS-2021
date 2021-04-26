import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

const logger = new Logger('User');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(200)
  @Post('user')
  async newUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    logger.log('Adding new user');
    const dto = {
      username: username,
      password: password,
      email: email,
      name: name,
    };
    try {
      return await this.userService.create(dto);
    } catch (e) {
      logger.log(`Caught error on adding user ${username}: ${e}`);
      throw new HttpException({ error: e.message }, HttpStatus.CONFLICT);
    }
  }

  @Get('user/:username')
  getUser(@Param('username') username: string) {
    logger.log(`Asked for user ${username}`);
    return this.userService.findOne(username);
  }

  @Get('allUsers')
  allUsers() {
    logger.log('Asked for all Users');
    return this.userService.find();
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const uinfo = {
      username: username,
      password: password,
    };
    return this.userService.login(uinfo);
  }

  /*
  @Post('testAuth')
  auth(@Body('token') token: string) {
    return this.userService.auth(token);
  }
  */
}
