
import { Book } from './Book';

export class Bookshelf {
    private listBook: Book[] = [];

    AddBook(book : Book):void{
    this.listBook.push(book);
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
 

  }
  