import { Injectable, OnModuleInit} from '@nestjs/common';
import { readFile } from 'fs/promises';
import {Book} from './interface/Book'
import { bookDto } from './interface/book.dto';


@Injectable()

export class BookService implements OnModuleInit {

    private listBook : Book[]=[];
onModuleInit(): Promise<void>{
return readFile('./src/dataset.json')
    .then((data)=>{
        this.listBook = JSON.parse(data.toString()); //Convertir le buffer en string puis en objet qui sera ajouter a la listBook
    }) 
    .catch((err)=>{
        throw(err);
    })
    
}


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

 

