import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from './auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);
  constructor(private authService: AuthService) {
    super({
      // move this out to .env
      secret: 'your-secret',
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: 'http://localhost:3000/auth/login/callback',
      sendMagicLink: async (destination, href) => {
        // send email here
        this.logger.debug(
          `sending email to ${destination} with the link ${href}`,
        );
      },
      verify: async (payload, callback) => {
        callback(null, this.validate(payload));
      },
    });
  }

  validate(payload: { destination: string }) {
    // validate email, user of application
    return this.authService.validateUser(payload.destination);
  }
}
