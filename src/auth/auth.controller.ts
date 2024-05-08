import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interface/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // call guard implements
  @UseGuards(AuthGuard)
  @Get('verify') // @User() > user.decorator, @Token() > token.decorator
  verifyUserToken(@User() user: CurrentUser, @Token() token: string) {
    // @Req() req, get value of  request['propertie'] assign in AutgGuard
    //const user = req['user'];
    //const token = req['token'];

    return { user , token};
    //return this.client.send('auth.verify.token', {});
  }
}
