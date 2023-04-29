exports.Book = class Book {

    constructor(bookid , title , description , publisher , author , pages){
        this.bookid = bookid;
        this.title = title;
        this.description = description;
        this.publisher = publisher;
        this.author = author;
        this.pages = pages;
    }
}