import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { User, UserDocument } from '../Schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  async signup(userDto: any) {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) throw new ConflictException('User already exists');

    const newUser = new this.userModel(userDto);
    await newUser.save();
    return { message: 'User created successfully' };
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: loginDto.email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return a JWT token
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}