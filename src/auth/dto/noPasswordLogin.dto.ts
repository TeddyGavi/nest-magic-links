import { IsEmail } from 'class-validator';
export class noPasswordLoginDto {
  @IsEmail()
  destination: string;
}
