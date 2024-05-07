import { Controller, Post, Get, Body, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TransformationInterceptor } from 'src/ultils/response';

@UseInterceptors(TransformationInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body('email') email: string) {
    return await this.authenticationService.signUp(email);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return await this.authenticationService.resetPassword(email);
  }

  @Post('change-password')
  async changePassword(@Body('email') email: string, @Body('password') password: string) {
    return await this.authenticationService.changePassword(email, password);
  }

  @Post('sign-in')
  async signIn(
    @Body('firebaseUID') firebaseUID: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    const response = await this.authenticationService.signIn(
      firebaseUID,
      email,
      username,
      password === undefined ? '' : password
    );
    return response;
  }

  @Get('otps')
  async getAllOtps() {
    return await this.authenticationService.getAllOtps();
  }

  @Post('otp/verification')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return await this.authenticationService.verifyOtp(email, otp);
  }
}
