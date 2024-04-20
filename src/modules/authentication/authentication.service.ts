import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { OTP } from 'src/entities/otp.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  private async sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'OTP for Verification',
      text: `Your OTP is: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException('Error sending email');
    }
  }

  private async createOtpRecord(email: string, otp: string) {
    const validUntil = new Date();
    validUntil.setMinutes(validUntil.getMinutes() + 3);

    const otpRecord = this.otpRepository.create({
      otp,
      email,
      validUntil,
    });

    try {
      await this.otpRepository.save(otpRecord);
    } catch (error) {
      console.error('Error saving OTP record:', error);
      throw new InternalServerErrorException('Error saving OTP record');
    }
  }

  private async handleOtpProcess(email: string) {
    try {
      const otp = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');

      await this.sendOtpEmail(email, otp);
      await this.createOtpRecord(email, otp);

      return {
        message: 'OTP sent successfully',
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new InternalServerErrorException('Error sending OTP');
    }
  }

  async signUp(email: string) {
    try {
      const existingOtp = await this.otpRepository.findOne({ where: { email } });

      if (existingOtp && existingOtp.validUntil > new Date()) {
        throw new NotFoundException('OTP already sent');
      }

      if (existingOtp) {
        await this.otpRepository.remove(existingOtp);
      }

      return this.handleOtpProcess(email);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new InternalServerErrorException('Error sending OTP');
    }
  }

  async signIn(firebaseUID: string, email: string, username: string, password: string) {
    let user = null;
    let providerId = null;

    // Check if password is empty
    if (password === '') {
      user = await this.userRepository.findOne({ where: { firebaseUID } });

      const firebaseUser = await admin.auth().getUser(firebaseUID);

      if (firebaseUser.providerData.length > 0) {
        providerId = firebaseUser.providerData[0].providerId;
      }

      if ((providerId === 'google.com' || providerId === 'firebase') && !user) {
        const createUserDto = {
          firebaseUID,
          email,
          password,
          username,
        };
        await this.createUser(createUserDto);
      }
    } else {
      user = await this.userRepository.findOne({ where: { username, password } });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      user,
      providerId,
    };
  }

  async resetPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.handleOtpProcess(email);
  }

  async changePassword(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = password;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new InternalServerErrorException('Error saving user');
    }

    return user;
  }

  async getAllOtps() {
    return this.otpRepository.find();
  }

  async verifyOtp(email: string, otp: string) {
    const otpRecord = await this.otpRepository.findOne({
      where: { email, otp },
      order: { validUntil: 'DESC' },
    });

    if (!otpRecord || otpRecord.validUntil < new Date()) {
      throw new NotFoundException('Invalid OTP');
    }

    await this.otpRepository.remove(otpRecord);

    return true;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error saving user');
    }

    return user;
  }
}
