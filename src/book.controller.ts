import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import {Book} from './interface/Book';
import { bookDto } from './interface/book.dto';


@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

@Post()
 AddBook(@Body() books: bookDto):Book {
  return this.bookService.AddBook(books);

}
@Get() 
findSomeof(@Query('author')author:string):Book[]{
  if(author){
    return this.bookService.getBooksof(author);
  }
  return this.bookService.getAllBooks();
}
getAllBooks():Book[]{
  return this.bookService.getAllBooks();
}
@Get(':title')
getBook(@Param('title') title: string): Book {
    return this.bookService.getBook(title);
  }

getBooksof(auteur: string): Book[]{
  return this.bookService.getBooksof(auteur);
}
getTotalNumberOfBooks(): number{
  return this.bookService.getTotalNumberOfBooks();
}

@Delete(':title')

async remove(@Param('title') titre: string) {
  return this.bookService.remove(titre);
}


}

