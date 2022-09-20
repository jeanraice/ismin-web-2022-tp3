import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit} from '@nestjs/common';
import { readFile } from 'fs/promises';
import {Book} from './interface/Book'
import { bookDto } from './interface/book.dto';
import {AxiosResponse} from 'Axios';
import { ApiBook } from './interface/ApiBook';
import {map,tap} from 'rxjs';


@Injectable()

export class BookService implements OnModuleInit {

private listBook : Book[]=[];
constructor(private readonly httpService : HttpService){}
async onModuleInit(): Promise<void>{
 await Promise.all([this.loadBooksFromAPI(),this.loadBooksFromFile()]);
}

private async loadBooksFromAPI():Promise<void>{

    this.httpService
    .get<ApiBook[]>('https://api.npoint.io/1c88134cf081609075b7') 
    .pipe(
        map((resp : AxiosResponse<ApiBook[]>)=>resp.data),
        tap((apiBook)=>{
            apiBook.forEach((elem)=>{
                return this.listBook.push({ 
                title : elem.title,
                author : elem.authors,
                date : elem.publication_date,
                });
            });
        }),
    ).subscribe();
}

private async loadBooksFromFile():Promise<void> {
    try {
        const data = await readFile('./src/dataset.json');
        this.listBook = JSON.parse(data.toString());
    }catch(error){
        console.log('Err :$(error)');
    }
    
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

 

