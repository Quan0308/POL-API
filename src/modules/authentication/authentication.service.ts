import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { OTP } from 'src/entities/otp.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
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
      console.error('Error sending email:', error);
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

  async signUp(email: string) {
    const existingOtp = await this.otpRepository.findOne({ where: { email } });

    if (existingOtp) {
      if (existingOtp.validUntil > new Date()) {
        throw new NotFoundException('OTP already sent');
      }

      await this.otpRepository.remove(existingOtp);
    }

    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    await this.sendOtpEmail(email, otp);
    await this.createOtpRecord(email, otp);

    return {
      message: 'OTP sent successfully',
    };
  }

  async getAllOtps() {
    return this.otpRepository.find();
  }

  async verifyOtp(email: string, otp: string) {
    const otpRecord = await this.otpRepository.findOne({
      where: { email, otp },
    });

    if (!otpRecord || otpRecord.validUntil < new Date()) {
      throw new NotFoundException('Invalid OTP');
    }

    await this.otpRepository.remove(otpRecord);

    return true;
  }
}
