import { Injectable, OnModuleInit} from '@nestjs/common';
import { fstat, readFile } from 'fs';
import {Book} from './interface/Book'
import { bookDto } from './interface/book.dto';


@Injectable()

export class BookService implements OnModuleInit {
onModuleInit(){
    readFile('./dataset.json', 'utf8', function (err,data){
            if (err) {
              return console.log(err);
            }
            console.log(data);
     throw new Error('Method not implemented.');
    })
}
   private listBook : Book[]=[];

    AddBook(book: bookDto):Book{
        if(!this.listBook.some((listBook) => book.title === listBook.title)) {
            this.listBook.push(book);
          }
        return this.getBook(book.title);
        }

    getBook(name : string):Book {
       const book = this.listBook.find( value=> value.title === name);
       if(!book){
        throw new Error('Book no found');
       }
       return book;
    }
    getAllBooks():Book[] {
        return this.listBook.sort((a:Book, b:Book)=>{
            return a.title.localeCompare(b.title);
        });
    }

    getBooksof(auteur: string): Book[] {
        return this.listBook.filter(value => value.author === auteur);
    }

    getTotalNumberOfBooks(): number{
        return this.listBook.length;
    }
    remove(title: string){
    
        const index = this.listBook.findIndex(ind => ind.title === title); 
        return this.listBook.splice(index, 1);//remove element from array
            };

        
}

 

