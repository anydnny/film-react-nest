//TODO реализовать DTO для /orders
import { IsArray, IsNumber, IsString, IsEmail } from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: Date;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class OrderDto {
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsArray()
  tickets: TicketDto[];
}
