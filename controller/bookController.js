
var query = require('../database/query')
var dbconnect = require ('../database/connection')
exports.getAllBooks = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var get_books_query = query.queryList.GET_ALL_BOOKS;
        var result = await dbconnect.DataBaseQuery(get_books_query);
        console.log('get_all_books ' );
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
}

exports.getBookDetails = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var id = req.params.id;
        var get_book_details = query.queryList.GET_BOOK_DETAILS;
        console.log('get_book_details' + " in id : " + id );
        var result = await dbconnect.DataBaseQuery(get_book_details,[id]);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
}
 

exports.getBookInSpscificStore = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var store_code = req.params.store_code;
        var GET_ALL_BOOKS_IN_STORE = query.queryList.GET_ALL_BOOKS_IN_STORE;
        var result = await dbconnect.DataBaseQuery(GET_ALL_BOOKS_IN_STORE,[store_code]);
        console.log('GET_ALL_BOOKS_IN_STORE' + " in code : " + store_code );
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
}
 
exports.saveBook =  async (req , res) =>{
    try {
        console.log('in controller .. ');
        var create_by = 'admin';
        var create_on = new Date();
        var title = req.body.title;
        var author = req.body.author;
        var publisher  = req.body.publisher;
        var pages = req.body.pages;
        var description = req.body.description;
        var store_code = req.body.store_code;
        if (!title || !author || !store_code ||  !publisher ){
            return res.status(500).send({error : ' book author and book title be not empty '});
        }
        values = [title , description ,author ,publisher , pages , store_code , create_on, create_by ];
        console.log(values);
        var save_new_book = query.queryList.SAVE_NEW_BOOK;
        console.log('save_new_book');
        await dbconnect.DataBaseQuery(save_new_book , values);
        
        return res.status(201).send("done , saved in database ") ;
    } catch (error) { 
        console.log("error : " + error) ;
        return res.status(500).send({error : 'ERROR , cant save'});
    }
}

 
exports.updateBook =  async (req , res) =>{
    try {
        console.log('in controller .. ');
        var create_by = 'admin';
        var create_on = new Date();
        var title = req.body.title;
        var author = req.body.author;
        var bookID=req.body.bookID;
        var publisher  = req.body.publisher;
        var pages = req.body.pages;
        var description = req.body.description;
        var store_code = req.body.store_code;
        if (!title || !author || !store_code || !publisher ){
            return res.status(500).send({error : ' book author and book title be not empty '});
        }
        values = [title , description ,author ,publisher , pages , store_code , create_on, create_by, bookID ];
        console.log(values);
        var update_book = query.queryList.UPDATE_BOOK;
        await dbconnect.DataBaseQuery(update_book , values);
        
        return res.status(201).send("done , saved in database ") ;
    } catch (error) { 
        console.log("error : " + error) ;
        return res.status(500).send({error : 'ERROR , cant save'});
    }

}

exports.deleteBook = async (req , res) => {
    var id = req.params.id;
    try {
      if(!id){
        return res.status(500).send({ error: 'can not delete empty bookId' })
        }
        var deleteBookQuery = query.queryList.DELETE_BOOK;
        console.log('delete with id .. ' + id);
        await dbconnect.DataBaseQuery(deleteBookQuery , [id]);
        return res.status(200).send("Successfully book deleted ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to delete book with id : '+ id});
    }
}