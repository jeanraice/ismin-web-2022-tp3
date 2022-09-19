import {IsDateString, IsNotEmpty, IsString } from 'class-validator';


export class bookDto {

  @IsNotEmpty()
  @IsString()
  title : string;

  @IsNotEmpty()
  @IsString()
  author : string;

  @IsNotEmpty()
  @IsDateString()
  date : string;

  constructor(title : string, author : string, date : Date){
    this.title = title;
    this.author = author;
    //this.date = date;
  }

}


