import {IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiBook } from './ApiBook';


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

  constructor(book : ApiBook){
    this.title = book.title;
    this.author =book.authors;
    this.date = book.publication_date;
  }

}


