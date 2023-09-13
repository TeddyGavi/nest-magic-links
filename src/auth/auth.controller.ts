import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magicLogin.strategy';
import { noPasswordLoginDto } from './dto/noPasswordLogin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MagicLoginStrategy,
  ) {}

  // POST /auth/login {email} ---> send magic link
  @Post('login')
  login(
    @Req() req,
    @Res() res,
    @Body(new ValidationPipe()) body: noPasswordLoginDto,
  ) {
    this.authService.validateUser(body.destination);
    return this.strategy.send(req, res);

    //  send magic link
  }
  // GET /auth/callback?token=some-token ---> verify token and send jwt
  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req) {
    return this.authService.generateTokens(req.user);
  }
}
