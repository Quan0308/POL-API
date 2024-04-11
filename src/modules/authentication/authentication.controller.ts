import { Controller, Post, Get, Body, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TransformationInterceptor } from 'src/ultils/response';

@UseInterceptors(TransformationInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signUp(@Body('email') email: string) {
    return this.authenticationService.signUp(email);
  }

  @Post('reset-password')
  resetPassword(@Body('email') email: string) {
    return this.authenticationService.resetPassword(email);
  }

  @Post('update-password')
  updatePassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authenticationService.updatePassword(email, password);
  }

  @Post('signin')
  signIn(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authenticationService.signIn(email, username, password);
  }

  @Get('otps')
  getAllOtps() {
    return this.authenticationService.getAllOtps();
  }

  @Post('verify-otp')
  verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.authenticationService.verifyOtp(email, otp);
  }
}
